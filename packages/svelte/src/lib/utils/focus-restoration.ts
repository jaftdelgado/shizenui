import { tick } from "svelte";
import { getRootActiveElement, getRovingCandidates } from "./focus.js";

/** What is needed to finish moving focus after an item that held it is gone. */
interface PendingRestoration {
  /** The removed item's element. */
  readonly item: HTMLElement;
  /** The container that held it. */
  readonly container: HTMLElement;
  /** Its position among the enabled items when the removal was requested. */
  readonly index: number;
  /** The item that should receive focus, computed when the removal was requested. */
  readonly successor: HTMLElement | undefined;
  readonly abort: AbortController;
}

/**
 * The focus that goes with the removal of the items of a container (for example, the tags of a
 * TagGroup). One per container. It is plain state, not reactive.
 *
 * `run` runs the consumer's `remove`. If the item held focus, it first keeps a pending
 * restoration, whether the consumer removes the item at once or later (a timeout, an awaited
 * request): where the item was and which item should receive focus once it is gone.
 *
 * The consumer decides when the item goes away, so the restoration finishes when the item's
 * element has left the DOM. Every unregistration in the container looks at it
 * (`notifyUnregistered`). An element that is still connected keeps it pending: the item may be in
 * an exit transition, its id may have changed (an unkeyed list registers the same element again)
 * or another item may be the one that was removed. When the element is gone, focus moves to a
 * neighbour, or to the container when none is left, but only if it is lost by then. If the
 * consumer never removes the item, nothing happens. At most one restoration is pending per
 * container.
 *
 * A pending restoration is dropped by:
 * - a `focusin` outside the item: focus moved on, with the keyboard or from code;
 * - a `pointerdown` anywhere in the document, the item itself included: as with a click on a page,
 *   the next press decides where focus goes. A click on the empty space of the container blurs the
 *   item on purpose, and it wins over the restoration, also when the pending item is disabled. The
 *   press that requested the removal (a remove button) is over by then, so it does not drop it;
 * - another removal, or the container being destroyed.
 *
 * Nothing listens to `focusout`. What the browser does with focus when it removes or disables
 * the item's element (Chromium blurs it, with no `relatedTarget`) does not matter: only where
 * focus is when the element is gone does.
 */
export class FocusRestoration {
  readonly #containerSelector: string;
  readonly #itemSelector: string;
  readonly #isRegistered: (id: string) => boolean;
  readonly #setActiveId: (id: string | undefined) => void;

  #pending: PendingRestoration | undefined;

  constructor(options: {
    /** Matches the container of the items, from an item's element upwards. */
    containerSelector: string;
    /** Matches the enabled items of a container. */
    itemSelector: string;
    isRegistered: (id: string) => boolean;
    setActiveId: (id: string | undefined) => void;
  }) {
    this.#containerSelector = options.containerSelector;
    this.#itemSelector = options.itemSelector;
    this.#isRegistered = options.isRegistered;
    this.#setActiveId = options.setActiveId;
  }

  /**
   * Runs `remove`, which hands the removal to the consumer: whether and when the item goes away is
   * up to it. `item` is the element of the item being removed, if it has one: when it holds focus,
   * focus is moved off it once it is gone.
   */
  readonly run = (item: HTMLElement | null, remove: () => void): void => {
    // Armed before `remove`: a consumer that flushes the DOM inside it unregisters the item right
    // there, and that has to find the restoration.
    const pending = item ? this.#armIfFocused(item) : undefined;

    remove();

    // A synchronous removal is done by now, so this finishes it. If the item is still there, the
    // unregistration of its element finishes it later.
    if (pending) void this.#settle(pending);
  };

  /** Drops the pending restoration, if any. */
  readonly cancel = (): void => {
    this.#pending?.abort.abort();
    this.#pending = undefined;
  };

  /**
   * An item of the container was unregistered. It may be the pending one, whose id can also have
   * changed (an id change unregisters and registers again), so this looks at the element, not at
   * the id.
   */
  readonly notifyUnregistered = (): void => {
    const pending = this.#pending;
    if (pending) void this.#settle(pending);
  };

  /**
   * Keeps the restoration pending until the item's element is gone, replacing the one that was
   * pending. Only an item that holds focus (and sits in a container, with a place among its items)
   * has anything to restore: for any other item, the restoration pending for another item is left
   * as it is.
   */
  #armIfFocused(item: HTMLElement): PendingRestoration | undefined {
    if (!item.contains(getRootActiveElement(item))) return undefined;

    const container = item.closest<HTMLElement>(this.#containerSelector);
    if (!container) return undefined;

    const position = findFocusSuccessor(
      getRovingCandidates<HTMLElement>(container, this.#itemSelector),
      item
    );
    if (!position) return undefined;

    this.cancel();

    const pending: PendingRestoration = {
      item,
      container,
      index: position.index,
      successor: position.successor,
      abort: new AbortController()
    };
    this.#pending = pending;

    const { signal } = pending.abort;

    // Both in the capture phase, so a handler that stops the event does not hide it.
    item.getRootNode().addEventListener(
      "focusin",
      (event) => {
        if (!(event.target instanceof Node && item.contains(event.target))) this.cancel();
      },
      { capture: true, signal }
    );

    item.ownerDocument.addEventListener("pointerdown", () => this.cancel(), {
      capture: true,
      signal
    });

    return pending;
  }

  async #settle(pending: PendingRestoration): Promise<void> {
    if (this.#pending !== pending) return;
    await tick();
    if (this.#pending !== pending) return;

    // Not removed (yet): keep waiting.
    if (pending.item.isConnected) return;

    this.cancel();
    this.#restore(pending);
  }

  /**
   * Moves focus to where it should go after an item that held it is gone, but only if focus is
   * lost: it may have gone elsewhere during the wait. The target is the saved successor if it is
   * still valid (connected, registered and enabled); else the enabled item now at the saved index,
   * or the one before it; else the container.
   */
  #restore({ container, index, successor }: PendingRestoration): void {
    if (!container.isConnected || !isFocusLost(container)) return;

    const items = getRovingCandidates<HTMLElement>(container, this.#itemSelector);
    const target =
      successor?.isConnected &&
      successor.matches(this.#itemSelector) &&
      this.#isRegistered(successor.id)
        ? successor
        : (items[index] ?? items[index - 1]);

    if (target) {
      this.#setActiveId(target.id);
      target.focus();
      return;
    }

    // No item left: the container becomes the tab stop again (there is no active item).
    container.focus();
  }
}

/**
 * Where `item` sits among the enabled `items` of its container, and the item that should receive
 * focus when it is removed: the next one, else the previous. The items are already queried: the
 * caller has the container, so it is read once.
 */
function findFocusSuccessor(
  items: readonly HTMLElement[],
  item: HTMLElement
): { index: number; successor: HTMLElement | undefined } | undefined {
  const index = items.indexOf(item);
  if (index === -1) return undefined;

  return { index, successor: items[index + 1] ?? items[index - 1] };
}

/** Focus is lost when nothing holds it, or only the document body or the container itself does. */
function isFocusLost(container: HTMLElement): boolean {
  const active = getRootActiveElement(container);
  return active === null || active === container.ownerDocument.body || active === container;
}
