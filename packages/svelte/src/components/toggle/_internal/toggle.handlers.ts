import type { ToggleState } from "./toggle.state.svelte.js";
import type { ToggleClickEvent } from "./toggle.types.js";

export function createToggleHandlers(options: {
  state: ToggleState;
  getValue: () => string | undefined;
  getOnClick?: () => ((e: ToggleClickEvent) => void) | null | undefined;
}) {
  const { state, getValue, getOnClick } = options;

  function toggle(): void {
    state.toggle(getValue());
  }

  function handleClick(event: ToggleClickEvent): void {
    toggle();
    getOnClick?.()?.(event);
  }

  return { handleClick };
}

export type ToggleHandlers = ReturnType<typeof createToggleHandlers>;
