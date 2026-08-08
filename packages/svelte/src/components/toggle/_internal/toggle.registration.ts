import { onDestroy } from "svelte";
import type {
  ToggleGroupContextResult,
  ToggleGroupRegistration
} from "../../toggle-group/_internal/index.js";

export function registerToggleInGroup(options: {
  groupCtx: ToggleGroupContextResult;
  id: string;
  getDisabled: () => boolean;
}): void {
  const { groupCtx, id, getDisabled } = options;

  const entry: ToggleGroupRegistration = {
    getDisabled
  };

  groupCtx.register(id, entry);

  onDestroy(() => {
    groupCtx.unregister(id);
  });
}
