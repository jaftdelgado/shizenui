import Root from "./Switch.svelte";
import Control from "./compound/Control.svelte";
import Thumb from "./compound/Thumb.svelte";
import Content from "./compound/Content.svelte";

export type {
  SwitchProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchContentProps,
  SwitchRenderState
} from "./_internal/index.js";

export const Switch = Object.assign(Root, {
  Control,
  Thumb,
  Content
});

export default {
  Switch
};
