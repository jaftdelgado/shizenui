import { FOCUSABLE_SELECTOR, getDeepActiveElement, getRovingCandidates } from "./focus.js";
import { isModifierKey } from "./keyboard.js";

// A focusable roving container: the container is the tab stop until an item has been active, so
// its markup does not depend on which items are registered, and it is the same on the server. This
// is the strategy to follow in new components. For a container that is not focusable itself, see
// `createRovingFocusEntry`.

export interface RovingContainerOptions {
  getContainer: () => HTMLElement | null;
  selector: string;
  onEnter: (target: HTMLElement) => void;
  /** Picks the item that receives focus when the container itself receives it. */
  resolveTarget: (candidates: HTMLElement[]) => HTMLElement | undefined;
}

/**
 * The handlers of a roving container that is focusable itself (it has a `tabindex`), so that Tab
 * can reach it and hand focus to an item.
 *
 * - A press that would focus the container itself (its empty space, a disabled item, any content
 *   that is not focusable) never gives it focus: the container is not meant to be focused with a
 *   pointer. Focus is lost instead, as with a press on any part of a page that cannot take focus,
 *   also when an item had it: an item that kept focus without a visible ring (a press hides it)
 *   would still take the arrow keys and `Delete`. A press on something focusable inside it (an
 *   item, a remove button, a consumer's input) is left alone.
 * - That press also makes the container the starting point of the next `Tab`, as the browser does
 *   with the place of a click: if the next key is `Tab`, it enters an item, even when focus was
 *   elsewhere. Any other key, `Shift+Tab` included, any other press, any focus change and the
 *   window losing focus forget it. A modifier pressed alone does not, so it can start a shortcut.
 * - Focus that reaches the container itself (from the keyboard, or from code) enters an item.
 *   Focus that comes from one of the items, or that reaches an item directly, is left alone.
 *
 * `destroy` must run when the container goes away, to drop a pending starting point.
 */
export function createRovingContainer(options: RovingContainerOptions) {
  /** Ends the pending starting point, if any: removes its document listeners. */
  let forgetStartingPoint: (() => void) | undefined;

  /** Moves focus to the item that should receive it. Returns that item, if there was one. */
  function enter(container: HTMLElement): HTMLElement | undefined {
    const candidates = getRovingCandidates<HTMLElement>(container, options.selector);
    const target = options.resolveTarget(candidates);
    if (!target) return undefined;

    target.focus();
    options.onEnter(target);
    return target;
  }

  function setStartingPoint(container: HTMLElement): void {
    forgetStartingPoint?.();

    const doc = container.ownerDocument;
    const controller = new AbortController();
    const forget = () => {
      controller.abort();
      if (forgetStartingPoint === forget) forgetStartingPoint = undefined;
    };
    forgetStartingPoint = forget;

    // Capture, so they run before any handler and also see the events one stops. The press that
    // sets the starting point has already passed its `pointerdown`, so it does not forget it.
    const listenerOptions = { capture: true, signal: controller.signal };

    doc.addEventListener(
      "keydown",
      (e) => {
        if (isModifierKey(e.key)) return;
        forget();

        if (e.key !== "Tab" || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
        if (!container.isConnected) return;

        // Focus may already be on the item (the press did not move it): then Tab stays there. Tab is
        // only cancelled when the item really has focus: if it cannot take it (the container was
        // hidden since the press), the browser moves on as it would without a starting point.
        const target = enter(container);
        if (target && getDeepActiveElement(doc) === target) e.preventDefault();
      },
      listenerOptions
    );
    doc.addEventListener("pointerdown", forget, listenerOptions);
    doc.addEventListener("focusin", forget, listenerOptions);
    doc.defaultView?.addEventListener("blur", forget, { signal: controller.signal });
  }

  function handleMouseDown(e: MouseEvent): void {
    const container = options.getContainer();
    if (!container || !(e.target instanceof Element)) return;

    // The browser would focus the nearest focusable ancestor of the target. Only when that is the
    // container itself (or nothing inside it) is the press kept from moving focus.
    const focusable = e.target.closest(FOCUSABLE_SELECTOR);
    if (focusable && focusable !== container && container.contains(focusable)) return;

    e.preventDefault();

    // Cancelling the press also keeps the element that has focus from losing it. It has to lose it
    // anyway, as the browser would do: blur validation and popups that close on `focusout` depend
    // on it, and an item of the container must not keep taking keys once the user clicked away
    // from it. The roving tab stop is not touched, so the next `Tab` returns to the same item.
    const active = getDeepActiveElement(container.ownerDocument);
    if (active && active !== container.ownerDocument.body) active.blur();

    setStartingPoint(container);
  }

  function handleFocusIn(e: FocusEvent): void {
    const container = options.getContainer();
    if (!container || e.target !== container) return;

    // Focus that comes from one of its own items is not an entry.
    const relatedTarget = e.relatedTarget;
    if (relatedTarget instanceof Node && container.contains(relatedTarget)) return;

    enter(container);
  }

  function destroy(): void {
    forgetStartingPoint?.();
  }

  return { handleMouseDown, handleFocusIn, destroy };
}
