import Root from "./Tag.svelte";
import RemoveButton from "./compound/RemoveButton.svelte";

export type {
  TagProps,
  TagClickEvent,
  TagRemoveButtonProps,
  TagVariant,
  TagSize
} from "./_internal/index.js";

export const Tag = Object.assign(Root, {
  RemoveButton
});

export default {
  Tag
};
