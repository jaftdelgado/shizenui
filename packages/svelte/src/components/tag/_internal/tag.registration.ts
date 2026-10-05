import { onDestroy } from "svelte";
import type { TagState } from "./tag.state.svelte.js";

export function setupTagGroupRegistration(state: TagState): void {
  const entry = {
    getDisabled: () => state.finalDisabled,
    getValue: () => state.value
  };

  state.groupCtx.register(state.id, entry);

  onDestroy(() => {
    state.groupCtx.unregister(state.id);
  });
}
