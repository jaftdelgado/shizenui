import type { RadioGroupContextResult } from "./radio-group.context.js";

export function createRadioGroupItemsHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: RadioGroupContextResult;
}) {
  const { getContainer, groupCtx } = options;

  function handleFocusIn(e: FocusEvent): void {
    if (groupCtx.value) return;

    const container = getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (relatedTarget && container.contains(relatedTarget)) return;

    const isShiftTab =
      relatedTarget !== null &&
      Boolean(container.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING);

    if (isShiftTab) {
      groupCtx.focusLastEnabled();
    } else {
      groupCtx.focusFirstEnabled();
    }
  }

  function handleKeydown(e: KeyboardEvent): void {
    const key = e.key;
    const isNext = key === "ArrowDown" || key === "ArrowRight";
    const isPrev = key === "ArrowUp" || key === "ArrowLeft";

    if (!isNext && !isPrev) return;

    e.preventDefault();
    groupCtx.moveFocus(isNext ? "next" : "prev");
  }

  return { handleFocusIn, handleKeydown };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
