import type { ToggleGroupContextResult } from "./toggle-group.context.js";
import type { ToggleGroupOrientation } from "./toggle-group.types.js";
import { createRovingFocusEntry, createRovingKeydown } from "../../../lib/utils/index.js";

const TOGGLE_SELECTOR = '[data-slot="toggle"]:not(:disabled)';

export function createToggleGroupHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: ToggleGroupContextResult;
  getOrientation: () => ToggleGroupOrientation;
  /** Whether the interaction in progress comes from a pointer (see `createInteractionModality`). */
  isPointerInteraction: () => boolean;
}) {
  const { getContainer, groupCtx, getOrientation, isPointerInteraction } = options;

  const { handleFocusIn } = createRovingFocusEntry({
    getContainer,
    isPointerInteraction,
    selector: TOGGLE_SELECTOR,
    onEnter: (target) => groupCtx.setActiveId(target.id)
  });

  const handleKeydown = createRovingKeydown({
    getContainer,
    selector: TOGGLE_SELECTOR,
    options: () => ({ orientation: getOrientation() }),
    wrapAround: false,
    onMove: (target) => groupCtx.setActiveId(target.id)
  });

  return { handleFocusIn, handleKeydown };
}

export type ToggleGroupHandlers = ReturnType<typeof createToggleGroupHandlers>;
