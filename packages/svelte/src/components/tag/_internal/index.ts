export type {
  TagProps,
  TagVariant,
  TagSize,
  TagClickEvent,
  TagRemoveButtonProps
} from "./tag.types.js";

export { TagState } from "./tag.state.svelte.js";
export type { TagStateInstance } from "./tag.state.svelte.js";
export { setupTagContexts } from "./tag.setup.svelte.js";
export { setupTagGroupRegistration } from "./tag.registration.js";
export { setupTagWarnings } from "./tag.warnings.js";

export { setTagContext, useTagContext } from "./tag.context.js";
export type { TagContextValue, TagContextResult } from "./tag.context.js";

export { createTagHandlers } from "./tag.handlers.js";
export type { TagHandlers } from "./tag.handlers.js";
