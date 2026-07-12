import type { RadioGroupContextResult } from "./radio-group.context.js";

function getRovingCandidates(container: HTMLElement): HTMLButtonElement[] {
  return Array.from(
    container.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([data-disabled])')
  );
}

export function createRadioGroupItemsHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: RadioGroupContextResult;
}) {
  const { getContainer, groupCtx } = options;

  function handleFocusIn(e: FocusEvent): void {
    if (groupCtx.value !== undefined) return;

    const container = getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget && container.contains(relatedTarget)) return;

    const isShiftTab =
      relatedTarget !== null &&
      Boolean(container.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING);

    const candidates = getRovingCandidates(container);
    if (candidates.length === 0) return;

    const target = isShiftTab ? candidates[candidates.length - 1] : candidates[0];
    if (!target) return;

    target.focus();
    groupCtx.setActiveId(target.id);
  }

  function handleKeydown(e: KeyboardEvent): void {
    const container = getContainer();
    if (!container) return;

    const candidates = getRovingCandidates(container);
    if (candidates.length === 0) return;

    const target = e.target as HTMLButtonElement;
    const currentIndex = candidates.indexOf(target);
    if (currentIndex === -1) return;

    const key = e.key;
    let targetIndex: number | undefined;

    if (key === "ArrowDown" || key === "ArrowRight") {
      targetIndex = currentIndex + 1;
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      targetIndex = currentIndex - 1;
    } else if (key === "Home") {
      targetIndex = 0;
    } else if (key === "End") {
      targetIndex = candidates.length - 1;
    } else {
      return;
    }

    e.preventDefault();

    const total = candidates.length;
    const wrappedIndex = ((targetIndex % total) + total) % total;
    const nextCandidate = candidates[wrappedIndex];
    if (!nextCandidate) return;

    nextCandidate.focus();
    groupCtx.setActiveId(nextCandidate.id);

    if (groupCtx.readonly) return;

    const value = groupCtx.getValueForId(nextCandidate.id);
    if (value !== undefined) {
      groupCtx.setValue(value);
    }
  }

  return { handleFocusIn, handleKeydown };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
