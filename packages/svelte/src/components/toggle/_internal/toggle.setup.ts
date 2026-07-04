import { onDestroy } from "svelte";
import type { ToggleGroupContextResult, ToggleGroupRegistration } from "../../toggle-group/_internal/index.js";

export function setupToggleGroupRegistration(options: {
  groupCtx: ToggleGroupContextResult;
  id: string;
  getRef: () => HTMLButtonElement | null;
  getDisabled: () => boolean;
}): void {
  const { groupCtx, id, getRef, getDisabled } = options;

  const entry: ToggleGroupRegistration = {
    getRef,
    getDisabled
  };

  groupCtx.register(id, entry);

  onDestroy(() => {
    groupCtx.unregister(id);
  });
}
