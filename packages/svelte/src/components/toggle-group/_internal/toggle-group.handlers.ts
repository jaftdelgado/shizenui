import type { ToggleGroupState } from "./toggle-group.state.svelte.js";
import type { ToggleGroupOrientation } from "./toggle-group.types.js";

export function createToggleGroupHandlers(options: {
  state: ToggleGroupState;
  getOrientation: () => ToggleGroupOrientation;
}) {
  const { state, getOrientation } = options;

  function handleKeydown(e: KeyboardEvent): void {
    const orientation = getOrientation();

    if (orientation === "horizontal") {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        state.moveFocus("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        state.moveFocus("next");
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      state.moveFocus("prev");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      state.moveFocus("next");
    }
  }

  return { handleKeydown };
}

export type ToggleGroupHandlers = ReturnType<typeof createToggleGroupHandlers>;
