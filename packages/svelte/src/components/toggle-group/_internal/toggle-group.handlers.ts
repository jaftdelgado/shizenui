import type { ToggleGroupContextResult } from "./toggle-group.context.js";
import type { ToggleGroupOrientation } from "./toggle-group.types.js";

export function createToggleGroupHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: ToggleGroupContextResult;
  getOrientation: () => ToggleGroupOrientation;
}) {
  const { getContainer, groupCtx, getOrientation } = options;

  function handleKeydown(e: KeyboardEvent): void {
    const container = getContainer();
    if (!container) return;

    const candidates = Array.from(
      container.querySelectorAll<HTMLButtonElement>('[data-slot="toggle"]:not(:disabled)')
    );
    if (candidates.length === 0) return;

    const current = e.target as HTMLButtonElement;
    const currentIndex = candidates.indexOf(current);
    if (currentIndex === -1) return;

    const orientation = getOrientation();
    let targetIndex: number | undefined;

    if (orientation === "horizontal") {
      if (e.key === "ArrowLeft") {
        targetIndex = currentIndex - 1;
      } else if (e.key === "ArrowRight") {
        targetIndex = currentIndex + 1;
      }
    } else if (e.key === "ArrowUp") {
      targetIndex = currentIndex - 1;
    } else if (e.key === "ArrowDown") {
      targetIndex = currentIndex + 1;
    }

    if (targetIndex === undefined) return;

    e.preventDefault();

    const nextCandidate = candidates[targetIndex];
    if (!nextCandidate) return;

    nextCandidate.focus();
    groupCtx.setActiveId(nextCandidate.id);
  }

  return { handleKeydown };
}

export type ToggleGroupHandlers = ReturnType<typeof createToggleGroupHandlers>;
