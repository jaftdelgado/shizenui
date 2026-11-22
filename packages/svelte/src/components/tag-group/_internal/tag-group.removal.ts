import { tick } from "svelte";
import { getRootActiveElement, getRovingCandidates } from "../../../lib/utils/index.js";
import { LIST_SELECTOR, TAG_SELECTOR } from "./tag-group.constants.js";

/** A tag asking its group to remove it, and to move focus off it if it held focus. */
export interface TagRemovalRequest {
  id: string;
  row: HTMLElement | null;
  /** Hands the removal to the consumer. Whether and when the tag goes away is up to it. */
  remove: () => void;
}

/** What is needed to finish moving focus after a tag that held it is gone. */
interface FocusRestorationRequest {
  /** The removed tag's element. */
  row: HTMLElement;
  /** The list that contained it. */
  grid: HTMLElement;
  /** Its position among the enabled tags when the removal was requested. */
  index: number;
  /** The tag that should receive focus, computed when the removal was requested. */
  successor: HTMLElement | undefined;
}

interface PendingRestoration extends FocusRestorationRequest {
  readonly abort: AbortController;
}

/**
 * The removal of the tags of a group and the focus that goes with it. One per group. It is plain
 * state, not reactive.
 *
 * `request` runs the consumer's `remove`. If the tag held focus, it first keeps a pending
 * restoration, whether the consumer removes the tag at once or later (a timeout, an awaited
 * request): where the tag was and which tag should receive focus once it is gone.
 *
 * The consumer decides when the tag goes away, so the restoration finishes when the row has left
 * the DOM. Every unregistration in the group looks at it (`notifyUnregistered`). A row that is
 * still connected keeps it pending: the tag may be in an exit transition, its id may have changed
 * (an unkeyed list registers the same row again) or another tag may be the one that was removed.
 * When the row is gone, focus moves to a neighbour, or to the list when none is left, but only if
 * it is lost by then. If the consumer never removes the tag, nothing happens. At most one
 * restoration is pending per group.
 *
 * A pending restoration is dropped by:
 * - a `focusin` outside the row: focus moved on, with the keyboard or from code;
 * - a `pointerdown` anywhere in the document, the row itself included: as with a click on a page,
 *   the next press decides where focus goes. A click on the empty space of the list blurs the row
 *   on purpose, and it wins over the restoration, also when the pending tag is disabled. The press
 *   that requested the removal (the remove button) is over by then, so it does not drop it;
 * - another removal, or the list being destroyed.
 *
 * Nothing listens to `focusout`. What the browser does with focus when it removes or disables
 * the row (Chromium blurs it, with no `relatedTarget`) does not matter: only where focus is when
 * the row is gone does.
 */
export class TagRemoval {
  readonly #isRegistered: (id: string) => boolean;
  readonly #setActiveId: (id: string | undefined) => void;

  #pending: PendingRestoration | undefined;

  constructor(options: {
    isRegistered: (id: string) => boolean;
    setActiveId: (id: string | undefined) => void;
  }) {
    this.#isRegistered = options.isRegistered;
    this.#setActiveId = options.setActiveId;
  }

  readonly request = (options: TagRemovalRequest): void => {
    const { row, remove } = options;

    const hadFocus = row !== null && row.contains(getRootActiveElement(row));
    const grid = hadFocus ? row.closest<HTMLElement>(LIST_SELECTOR) : null;
    const position = hadFocus ? findFocusSuccessor(row) : undefined;

    // Armed before `remove`: a consumer that flushes the DOM inside it unregisters the tag right
    // there, and that has to find the restoration.
    const pending =
      row && grid && position
        ? this.#arm({ row, grid, index: position.index, successor: position.successor })
        : undefined;

    remove();

    // A synchronous removal is done by now, so this finishes it. If the tag is still there, the
    // unregistration of the row finishes it later.
    if (pending) void this.#settle(pending);
  };

  /** Drops the pending restoration, if any. */
  readonly cancel = (): void => {
    this.#pending?.abort.abort();
    this.#pending = undefined;
  };

  /**
   * A tag of the group was unregistered. It may be the pending one, whose id can also have changed
   * (an id change unregisters and registers again), so this looks at the row, not at the id.
   */
  readonly notifyUnregistered = (): void => {
    const pending = this.#pending;
    if (pending) void this.#settle(pending);
  };

  /** Keeps the restoration pending until the row is gone. Replaces the one that was pending. */
  #arm(request: FocusRestorationRequest): PendingRestoration {
    this.cancel();

    const pending: PendingRestoration = { ...request, abort: new AbortController() };
    this.#pending = pending;

    const { row } = request;
    const { signal } = pending.abort;

    // Both in the capture phase, so a handler that stops the event does not hide it.
    row.getRootNode().addEventListener(
      "focusin",
      (event) => {
        if (!(event.target instanceof Node && row.contains(event.target))) this.cancel();
      },
      { capture: true, signal }
    );

    row.ownerDocument.addEventListener("pointerdown", () => this.cancel(), {
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
    if (pending.row.isConnected) return;

    this.cancel();
    this.#restore(pending);
  }

  /** Only acts if focus is lost: it may have gone elsewhere during the wait. */
  #restore({ grid, index, successor }: FocusRestorationRequest): void {
    if (!grid.isConnected || !isFocusLost(grid)) return;

    this.#focusTarget({ grid, index, successor });
  }

  /**
   * Moves focus to where it should go after a tag that held it is gone: the saved successor if it
   * is still valid (connected, registered and enabled); else the enabled tag now at the saved
   * index, or the one before it; else the list.
   */
  #focusTarget(options: {
    grid: HTMLElement;
    index: number;
    successor: HTMLElement | undefined;
  }): void {
    const { grid, index, successor } = options;

    const candidates = getRovingCandidates<HTMLElement>(grid, TAG_SELECTOR);
    const target =
      successor?.isConnected && successor.matches(TAG_SELECTOR) && this.#isRegistered(successor.id)
        ? successor
        : (candidates[index] ?? candidates[index - 1]);

    if (target) {
      this.#setActiveId(target.id);
      target.focus();
      return;
    }

    // No tag left: the list becomes the tab stop again (tabStopId is undefined).
    grid.focus();
  }
}

/**
 * Where `row` sits among the enabled tags of its list, and the tag that should receive focus
 * when it is removed: the next one, else the previous.
 */
function findFocusSuccessor(
  row: HTMLElement
): { index: number; successor: HTMLElement | undefined } | undefined {
  const grid = row.closest<HTMLElement>(LIST_SELECTOR);
  if (!grid) return undefined;

  const rows = getRovingCandidates<HTMLElement>(grid, TAG_SELECTOR);
  const index = rows.indexOf(row);
  if (index === -1) return undefined;

  return { index, successor: rows[index + 1] ?? rows[index - 1] };
}

/** Focus is lost when nothing holds it, or only the document body or the list itself does. */
function isFocusLost(grid: HTMLElement): boolean {
  const active = getRootActiveElement(grid);
  return active === null || active === grid.ownerDocument.body || active === grid;
}
