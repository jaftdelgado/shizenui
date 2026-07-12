import { onDestroy } from "svelte";
import type { RadioState } from "./radio.state.svelte.js";

export function setupRadioGroupRegistration(state: RadioState): void {
  const entry = {
    getDisabled: () => state.finalDisabled,
    getValue: () => state.value
  };

  state.groupCtx.register(state.id, entry);

  onDestroy(() => {
    state.groupCtx.unregister(state.id);
  });
}
