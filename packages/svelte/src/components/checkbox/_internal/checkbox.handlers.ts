import type { CheckboxStateInstance } from "./checkbox.state.svelte.js";
import type { CheckboxClickEvent } from "./checkbox.types.js";

export function createCheckboxHandlers(options: {
  state: CheckboxStateInstance;
  setChecked: (value: boolean) => void;
  setIndeterminate: (value: boolean) => void;
  getOnClick?: () => ((e: CheckboxClickEvent) => void) | undefined;
}) {
  const { state, setChecked, setIndeterminate, getOnClick } = options;

  function activate(): void {
    if (state.finalDisabled || state.finalReadonly) return;

    if (state.groupCtx.exists) {
      if (state.value !== undefined) state.groupCtx.toggleValue(state.value);
      return;
    }

    if (state.isIndeterminate) {
      setIndeterminate(false);
      setChecked(true);
      return;
    }

    setChecked(!state.isChecked);
  }

  function handleClick(e: CheckboxClickEvent): void {
    activate();
    getOnClick?.()?.(e);
  }

  return { handleClick };
}

export type CheckboxHandlers = ReturnType<typeof createCheckboxHandlers>;
