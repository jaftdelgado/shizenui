import { getRovingCandidates } from "./focus.js";

// Entry into a container that is not focusable itself: its items hold the tab stops, and the focus
// that arrives from outside the container is redirected to the item that should receive it (see
// `createRovingFocusEntry`). Use `createRovingContainer` for a container that is the tab stop.

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
