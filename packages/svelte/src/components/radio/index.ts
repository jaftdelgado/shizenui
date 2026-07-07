import Root from "./Radio.svelte";
import Control from "./compound/Control.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";

export type {
  RadioProps,
  RadioControlProps,
  RadioContentProps,
  RadioIndicatorProps
} from "./_internal/index.js";

export const Radio = Object.assign(Root, {
  Control,
  Indicator,
  Content
});

export default {
  Radio
};
