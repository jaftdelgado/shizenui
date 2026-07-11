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

    if (key === "Home") {
      e.preventDefault();
      groupCtx.focusFirstEnabled({ select: true });
      return;
    }

    if (key === "End") {
      e.preventDefault();
      groupCtx.focusLastEnabled({ select: true });
      return;
    }

    const isNext = key === "ArrowDown" || key === "ArrowRight";
    const isPrev = key === "ArrowUp" || key === "ArrowLeft";

    if (!isNext && !isPrev) return;

    e.preventDefault();
    groupCtx.moveFocus(isNext ? "next" : "prev");
  }

  function handleFocusOut(e: FocusEvent): void {
    const container = getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (relatedTarget && container.contains(relatedTarget)) return;

    groupCtx.clearFocusOverride();
  }

  return { handleFocusIn, handleKeydown, handleFocusOut };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
