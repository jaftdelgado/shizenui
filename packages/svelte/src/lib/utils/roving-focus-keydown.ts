import { getRovingCandidates } from "./focus.js";
import {
  isRovingFocusKey,
  resolveRovingFocusIndex,
  type RovingFocusKeyOptions
} from "./roving-focus-index.js";

export interface RovingKeydownOptions {
  getContainer: () => HTMLElement | null;
  selector: string;
  /** Navigation keys. Pass a function when they depend on reactive state (e.g. orientation). */
  options: RovingFocusKeyOptions | (() => RovingFocusKeyOptions);
  /**
   * Whether moving past the last item goes back to the first, and the other way around. Pass a
   * function to decide it per key press (e.g. not while extending a selection with `Shift`).
   */
  wrapAround?: boolean | ((e: KeyboardEvent) => boolean);
  /**
   * Whether a navigation key pressed with `Ctrl`, `Meta` or `Alt` is still handled. By default it
   * is not: those combinations belong to the browser (e.g. `Alt+ArrowLeft` goes back).
   */
  acceptsModifiedKey?: (e: KeyboardEvent) => boolean;
  /**
   * Called after focus has moved to the next item, with the key press that moved it. `candidates`
   * are the enabled items in DOM order, as this key press found them: reuse them instead of
   * querying the DOM again.
   */
  onMove: (target: HTMLElement, e: KeyboardEvent, candidates: readonly HTMLElement[]) => void;
}

function swapHorizontalKey(key: string): string {
  if (key === "ArrowLeft") return "ArrowRight";
  if (key === "ArrowRight") return "ArrowLeft";
  return key;
}

export function createRovingKeydown(config: RovingKeydownOptions) {
  return function handleKeydown(e: KeyboardEvent): void {
    // Modified keys belong to the browser (e.g. Alt+ArrowLeft goes back), unless accepted.
    if ((e.altKey || e.ctrlKey || e.metaKey) && !config.acceptsModifiedKey?.(e)) return;

    const options = typeof config.options === "function" ? config.options() : config.options;
    if (!isRovingFocusKey(e.key, options)) return;

    const container = config.getContainer();
    if (!container) return;

    // In a right-to-left container the horizontal arrows point the other way. The direction is read
    // only for them: reading it forces a style recalculation, and no other key depends on it.
    const isHorizontalArrow = e.key === "ArrowLeft" || e.key === "ArrowRight";
    const key =
      isHorizontalArrow && getComputedStyle(container).direction === "rtl"
        ? swapHorizontalKey(e.key)
        : e.key;

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
      wrapAround:
        typeof config.wrapAround === "function"
          ? config.wrapAround(e)
          : (config.wrapAround ?? false)
    });
    if (targetIndex === undefined) return;

    const nextCandidate = candidates[targetIndex];
    if (!nextCandidate) return;

    nextCandidate.focus();
    config.onMove(nextCandidate, e, candidates);
  };
}
