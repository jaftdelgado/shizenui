import Root from "./Checkbox.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";

export type {
  CheckboxProps,
  CheckboxClickEvent,
  CheckboxControlProps,
  CheckboxContentProps,
  CheckboxIndicatorProps
} from "./_internal/index.js";

export const Checkbox = Object.assign(Root, {
  Control,
  Indicator,
  Content
});

export default {
  Checkbox
};
