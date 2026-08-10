import type { ToggleGroupContextResult } from "./toggle-group.context.js";
import type { ToggleGroupOrientation } from "./toggle-group.types.js";
import {
  getRovingCandidates,
  isRovingFocusKey,
  resolveRovingFocusIndex
} from "../../../lib/utils/index.js";

export function createToggleGroupHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: ToggleGroupContextResult;
  getOrientation: () => ToggleGroupOrientation;
}) {
  const { getContainer, groupCtx, getOrientation } = options;

  function handleKeydown(e: KeyboardEvent): void {
    const orientation = getOrientation();
    const navigationOptions = { orientation } as const;

    if (!isRovingFocusKey(e.key, navigationOptions)) return;

    const container = getContainer();
    if (!container) return;

    const candidates = getRovingCandidates<HTMLButtonElement>(
      container,
      '[data-slot="toggle"]:not(:disabled)'
    );
    if (candidates.length === 0) return;

    const current = e.target as HTMLButtonElement;
    const currentIndex = candidates.indexOf(current);
    if (currentIndex === -1) return;

    e.preventDefault();

    const targetIndex = resolveRovingFocusIndex({
      key: e.key,
      currentIndex,
      itemCount: candidates.length,
      orientation,
      wrapAround: false
    });
    if (targetIndex === undefined) return;

    const nextCandidate = candidates[targetIndex];
    if (!nextCandidate) return;

    nextCandidate.focus();
    groupCtx.setActiveId(nextCandidate.id);
  }

  return { handleKeydown };
}

export type ToggleGroupHandlers = ReturnType<typeof createToggleGroupHandlers>;
