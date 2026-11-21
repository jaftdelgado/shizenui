import type { RadioStateInstance } from "./radio.state.svelte.js";
import type { RadioClickEvent } from "./radio.types.js";

export function createRadioHandlers(options: {
  state: RadioStateInstance;
  getOnClick?: () => ((e: RadioClickEvent) => void) | undefined;
}) {
  const { state, getOnClick } = options;

  function activate(): void {
    if (state.finalDisabled || state.finalReadonly) return;
    state.groupCtx.setValue(state.value);
  }

  function handleClick(e: RadioClickEvent): void {
    activate();
    getOnClick?.()?.(e);
  }

  return { handleClick };
}

export type RadioHandlers = ReturnType<typeof createRadioHandlers>;
