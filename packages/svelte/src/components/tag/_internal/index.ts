export type {
  TagProps,
  TagVariant,
  TagSize,
  TagIconContent,
  TagClickEvent,
  TagRemoveButtonProps
} from "./tag.types.js";

export { TagState } from "./tag.state.svelte.js";
export { getTagAttributes, getTagRemoveButtonAttributes } from "./tag.attributes.js";
export { setupTagWarnings, setupTagRemoveButtonWarnings } from "./tag.warnings.js";

export { setTagContext, useTagContext } from "./tag.context.js";
export type { TagContext } from "./tag.context.js";

export { createTagHandlers, createTagRemoveButtonHandlers } from "./tag.handlers.js";
