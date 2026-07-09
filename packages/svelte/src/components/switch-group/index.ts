import Root from "./SwitchGroup.svelte";
import Items from "./compound/Items.svelte";

export type {
  SwitchGroupProps,
  SwitchGroupItemsProps,
  SwitchGroupOrientation
} from "./_internal/index.js";

export const SwitchGroup = Object.assign(Root, {
  Items
});

export default {
  SwitchGroup
};
