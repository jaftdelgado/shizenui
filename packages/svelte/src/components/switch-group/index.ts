import SwitchGroupRoot from "./SwitchGroup.svelte";
import Items from "./compound/Items.svelte";

export type { SwitchGroupOrientation } from "./_internal/index.js";

export const SwitchGroup = Object.assign(SwitchGroupRoot, {
  Items
});

export default SwitchGroup;
