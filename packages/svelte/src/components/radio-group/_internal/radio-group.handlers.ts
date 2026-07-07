import type { RadioGroupContextResult } from "../../../../contexts/internal/index.js";

export function createRadioGroupItemsHandlers(
  getContainer: () => HTMLDivElement,
  groupCtx: RadioGroupContextResult
) {
  function getEnabledInputs(): HTMLInputElement[] {
    return Array.from(
      getContainer().querySelectorAll<HTMLInputElement>('input[type="radio"]:not(:disabled)')
    );
  }

  function handleFocusIn(e: FocusEvent) {
    if (groupCtx.value) return;

    const container = getContainer();
    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (relatedTarget && container.contains(relatedTarget)) return;

    const inputs = getEnabledInputs();
    const first = inputs[0];
    const last = inputs[inputs.length - 1];

    if (!first || !last) return;

    const isShiftTab =
      relatedTarget !== null &&
      Boolean(container.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING);

    if (isShiftTab) {
      last.focus();
    } else {
      first.focus();
    }
  }

  return { handleFocusIn };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
