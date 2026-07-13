import CheckboxRoot from "./Checkbox.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";

export const Checkbox = Object.assign(CheckboxRoot, {
  Control,
  Indicator,
  Content
});

export { CheckboxRoot };

export default {
  Checkbox
};
