import type { SwitchClickEvent } from "./switch.types.js";
import type { SwitchState } from "./switch.state.svelte.js";

export function createSwitchHandlers(options: {
  state: SwitchState;
  setChecked: (value: boolean) => void;
  getValue: () => string | undefined;
  getOnClick?: () => ((event: SwitchClickEvent) => void) | undefined;
}) {
  const { state, setChecked, getValue, getOnClick } = options;

  function toggle(): void {
    if (state.finalDisabled || state.finalReadonly) return;
    const value = getValue();

    if (state.groupCtx.exists) {
      if (value !== undefined) state.groupCtx.toggleValue(value);
      return;
    }

    const next = !state.finalChecked;
    setChecked(next);
  }

  function handleClick(event: SwitchClickEvent): void {
    toggle();
    getOnClick?.()?.(event);
  }

  return { handleClick };
}

export type SwitchHandlers = ReturnType<typeof createSwitchHandlers>;
