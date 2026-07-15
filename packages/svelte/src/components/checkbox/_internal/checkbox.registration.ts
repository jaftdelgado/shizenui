import { onDestroy } from "svelte";
import type { CheckboxState } from "./checkbox.state.svelte.js";

export function setupCheckboxGroupRegistration(state: CheckboxState): void {
  const entry = {
    getDisabled: () => state.finalDisabled,
    getValue: () => state.value
  };

  state.groupCtx.register(state.id, entry);

  onDestroy(() => {
    state.groupCtx.unregister(state.id);
  });
}
