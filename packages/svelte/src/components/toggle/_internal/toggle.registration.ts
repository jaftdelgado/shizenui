import { onDestroy } from "svelte";
import type { ToggleStateInstance } from "./toggle.state.svelte.js";

export function setupToggleGroupRegistration(state: ToggleStateInstance): void {
  const { groupCtx } = state;

  const entry = {
    getDisabled: () => state.finalDisabled
  };

  groupCtx.register(state.id, entry);

  onDestroy(() => {
    groupCtx.unregister(state.id);
  });
}
