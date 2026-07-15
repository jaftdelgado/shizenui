import Root from "./CheckboxGroup.svelte";
import Items from "./compound/Items.svelte";

export type {
  CheckboxGroupProps,
  CheckboxGroupOrientation,
  CheckboxGroupItemsProps
} from "./_internal/index.js";

export const CheckboxGroup = Object.assign(Root, {
  Items
});

export default {
  CheckboxGroup
};
