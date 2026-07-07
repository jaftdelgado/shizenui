import RadioRoot from "./Radio.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";

export type { RadioProps, RadioContext } from "./_internal/index.js";
export { RadioState, createRadioHandlers } from "./_internal/index.js";

export const Radio = Object.assign(RadioRoot, {
  Control,
  Indicator,
  Content
});

export { RadioRoot };

export default {
  Radio
};
