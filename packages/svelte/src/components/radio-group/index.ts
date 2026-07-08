import Root from "./RadioGroup.svelte";
import Items from "./compound/Items.svelte";

export type { RadioGroupProps, RadioGroupItemsProps } from "./_internal/index.js";

export const RadioGroup = Object.assign(Root, {
  Items
});

export default {
  RadioGroup
};
