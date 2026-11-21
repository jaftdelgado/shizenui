import { FOCUSABLE_SELECTOR, getDeepActiveElement } from "./focus.js";
import { isModifierKey } from "./keyboard.js";

export type RovingFocusOrientation = "horizontal" | "vertical";

export interface RovingFocusIndexOptions {
  key: string;
  currentIndex: number;
  itemCount: number;
  orientation: RovingFocusOrientation;
  allowCrossAxis?: boolean;
  includeHomeEnd?: boolean;
  wrapAround?: boolean;
}

export interface RovingFocusKeyOptions {
  orientation: RovingFocusOrientation;
  allowCrossAxis?: boolean;
  includeHomeEnd?: boolean;
}

const HORIZONTAL_KEY_OFFSETS = {
  ArrowRight: 1,
  ArrowLeft: -1
} as const;

const VERTICAL_KEY_OFFSETS = {
  ArrowDown: 1,
  ArrowUp: -1
} as const;

const CROSS_AXIS_KEY_OFFSETS = {
  ...HORIZONTAL_KEY_OFFSETS,
  ...VERTICAL_KEY_OFFSETS
} as const;

function getKeyOffsetMap(
  orientation: RovingFocusOrientation,
  allowCrossAxis: boolean
): Record<string, number> {
  if (allowCrossAxis) return CROSS_AXIS_KEY_OFFSETS;
  return orientation === "horizontal" ? HORIZONTAL_KEY_OFFSETS : VERTICAL_KEY_OFFSETS;
}

export function getRovingCandidates<T extends HTMLElement>(
  container: HTMLElement,
  selector: string
): T[] {
  return Array.from(container.querySelectorAll<T>(selector));
}

export function isRovingFocusKey(key: string, options: RovingFocusKeyOptions): boolean {
  const { orientation, allowCrossAxis = false, includeHomeEnd = false } = options;

  if (includeHomeEnd && (key === "Home" || key === "End")) {
    return true;
  }

  return Object.hasOwn(getKeyOffsetMap(orientation, allowCrossAxis), key);
}

export function resolveRovingFocusIndex(options: RovingFocusIndexOptions): number | undefined {
  const {
    key,
    currentIndex,
    itemCount,
    orientation,
    allowCrossAxis = false,
    includeHomeEnd = false,
    wrapAround = false
  } = options;

  const isCurrentIndexValid = currentIndex >= 0 && currentIndex < itemCount;
  if (itemCount === 0 || !isCurrentIndexValid) {
    return undefined;
  }

  if (includeHomeEnd) {
    if (key === "Home") return 0;
    if (key === "End") return itemCount - 1;
  }

  const offsetMap = getKeyOffsetMap(orientation, allowCrossAxis);
  if (!Object.hasOwn(offsetMap, key)) {
    return undefined;
  }

  const offset = offsetMap[key];
  if (offset === undefined) {
    return undefined;
  }

  const nextIndex = currentIndex + offset;

  if (wrapAround) {
    return (nextIndex + itemCount) % itemCount;
  }

  return nextIndex >= 0 && nextIndex < itemCount ? nextIndex : undefined;
}

export interface RovingFocusEntryOptions {
  getContainer: () => HTMLElement | null;
  selector: string;
  onEnter: (target: HTMLElement) => void;
  /**
   * Whether the interaction in progress comes from a pointer (the interaction modality). Focus
   * that arrives with a pointer is never redirected: the user chose where it goes.
   */
  isPointerInteraction: () => boolean;
  shouldRedirect?: () => boolean;
  /**
   * Picks the item that receives focus when entering the container.
   * Defaults to the first candidate on Tab and the last one on Shift+Tab.
   */
  resolveTarget?: (candidates: HTMLElement[], isShiftTab: boolean) => HTMLElement | undefined;
}

function resolveEdgeTarget(
  candidates: HTMLElement[],
  isShiftTab: boolean
): HTMLElement | undefined {
  return isShiftTab ? candidates[candidates.length - 1] : candidates[0];
}

export function createRovingFocusEntry(options: RovingFocusEntryOptions) {
  function handleFocusIn(e: FocusEvent): void {
    if (options.isPointerInteraction()) return;
    if (options.shouldRedirect && !options.shouldRedirect()) return;

    const container = options.getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget && container.contains(relatedTarget)) return;

    const isShiftTab =
      relatedTarget !== null &&
      Boolean(container.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING);

    const candidates = getRovingCandidates<HTMLElement>(container, options.selector);
    const resolveTarget = options.resolveTarget ?? resolveEdgeTarget;
    const target = resolveTarget(candidates, isShiftTab);
    if (!target) return;

    if (e.target !== target) target.focus();
    options.onEnter(target);
  }

  return { handleFocusIn };
}

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

export interface RovingKeydownOptions {
  getContainer: () => HTMLElement | null;
  selector: string;
  /** Navigation keys. Pass a function when they depend on reactive state (e.g. orientation). */
  options: RovingFocusKeyOptions | (() => RovingFocusKeyOptions);
  wrapAround?: boolean;
  /** Called after focus has moved to the next item. */
  onMove: (target: HTMLElement) => void;
}

function swapHorizontalKey(key: string): string {
  if (key === "ArrowLeft") return "ArrowRight";
  if (key === "ArrowRight") return "ArrowLeft";
  return key;
}

export function createRovingKeydown(config: RovingKeydownOptions) {
  return function handleKeydown(e: KeyboardEvent): void {
    // Modified arrows belong to the browser (e.g. Alt+ArrowLeft goes back).
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    const options = typeof config.options === "function" ? config.options() : config.options;
    if (!isRovingFocusKey(e.key, options)) return;

    const container = config.getContainer();
    if (!container) return;

    // In a right-to-left container the horizontal arrows point the other way.
    const isRtl = getComputedStyle(container).direction === "rtl";
    const key = isRtl ? swapHorizontalKey(e.key) : e.key;

    const candidates = getRovingCandidates<HTMLElement>(container, config.selector);
    if (candidates.length === 0) return;

    // The target may sit inside an item (e.g. a tag's remove button), not be the item itself.
    const current = (e.target as HTMLElement).closest<HTMLElement>(config.selector);
    const currentIndex = current ? candidates.indexOf(current) : -1;
    if (currentIndex === -1) return;

    e.preventDefault();

    const targetIndex = resolveRovingFocusIndex({
      key,
      currentIndex,
      itemCount: candidates.length,
      ...options,
      wrapAround: config.wrapAround ?? false
    });
    if (targetIndex === undefined) return;

    const nextCandidate = candidates[targetIndex];
    if (!nextCandidate) return;

    nextCandidate.focus();
    config.onMove(nextCandidate);
  };
}
