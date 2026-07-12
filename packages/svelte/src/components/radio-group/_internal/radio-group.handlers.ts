import type { RadioGroupContextResult } from "./radio-group.context.js";

export function createRadioGroupItemsHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: RadioGroupContextResult;
}) {
  const { getContainer, groupCtx } = options;

  function getCandidates(): HTMLButtonElement[] {
    const container = getContainer();
    if (!container) return [];

    return Array.from(
      container.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')
    );
  }

  function focusCandidate(node: HTMLButtonElement | undefined, options: { select: boolean }): void {
    if (!node) return;

    node.focus();
    groupCtx.setActiveId(node.id);

    if (options.select && !groupCtx.readonly) {
      const value = groupCtx.getValueForId(node.id);
      if (value !== undefined) {
        groupCtx.setValue(value);
      }
    }
  }

  function handleFocusIn(e: FocusEvent): void {
    if (groupCtx.value) return;

    const container = getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (relatedTarget && container.contains(relatedTarget)) return;

    const isShiftTab =
      relatedTarget !== null &&
      Boolean(container.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING);

    const candidates = getCandidates();
    if (candidates.length === 0) return;

    focusCandidate(isShiftTab ? candidates[candidates.length - 1] : candidates[0], {
      select: false
    });
  }

  function handleKeydown(e: KeyboardEvent): void {
    const key = e.key;
    const candidates = getCandidates();
    if (candidates.length === 0) return;

    if (key === "Home") {
      e.preventDefault();
      focusCandidate(candidates[0], { select: true });
      return;
    }

    if (key === "End") {
      e.preventDefault();
      focusCandidate(candidates[candidates.length - 1], { select: true });
      return;
    }

    const isNext = key === "ArrowDown" || key === "ArrowRight";
    const isPrev = key === "ArrowUp" || key === "ArrowLeft";

    if (!isNext && !isPrev) return;

    e.preventDefault();

    const target = e.target as HTMLButtonElement;
    const currentIndex = candidates.indexOf(target);
    if (currentIndex === -1) return;

    const total = candidates.length;
    const nextIndex = isNext ? (currentIndex + 1) % total : (currentIndex - 1 + total) % total;

    focusCandidate(candidates[nextIndex], { select: true });
  }

  function handleFocusOut(e: FocusEvent): void {
    const container = getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (relatedTarget && container.contains(relatedTarget)) return;

    groupCtx.setActiveId(undefined);
  }

  return { handleFocusIn, handleKeydown, handleFocusOut };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
