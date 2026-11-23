import type { RadioGroupContextResult } from "./radio-group.context.js";
import { createRovingFocusEntry, createRovingKeydown } from "../../../lib/utils/index.js";

const RADIO_SELECTOR = '[role="radio"]:not([data-disabled])';

export function createRadioGroupItemsHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: RadioGroupContextResult;
  /** Whether the interaction in progress comes from a pointer (see `createInteractionModality`). */
  isPointerInteraction: () => boolean;
}) {
  const { getContainer, groupCtx, isPointerInteraction } = options;

  const { handleFocusIn } = createRovingFocusEntry({
    getContainer,
    isPointerInteraction,
    selector: RADIO_SELECTOR,
    shouldRedirect: () => !groupCtx.hasSelection,
    onEnter: (target) => groupCtx.setActiveId(target.id)
  });

  const handleKeydown = createRovingKeydown({
    getContainer,
    selector: RADIO_SELECTOR,
    options: () => ({
      orientation: groupCtx.orientation,
      allowCrossAxis: true,
      includeHomeEnd: true
    }),
    wrapAround: true,
    onMove: (target) => {
      groupCtx.setActiveId(target.id);

      if (groupCtx.readonly) return;

      const value = groupCtx.getValueForId(target.id);
      if (value !== undefined) {
        groupCtx.setValue(value);
      }
    }
  });

  return { handleFocusIn, handleKeydown };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
