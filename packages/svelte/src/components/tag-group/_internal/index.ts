export type { TagGroupProps, TagGroupListProps, TagGroupSelectionMode } from "./tag-group.types.js";

export { TagGroupState } from "./tag-group.state.svelte.js";
export { getTagGroupAttributes, getTagGroupListAttributes } from "./tag-group.attributes.js";

export { setupTagGroupContexts } from "./tag-group.setup.js";
export { setupTagGroupWarnings, setupTagGroupListWarnings } from "./tag-group.warnings.js";

export {
  setTagGroupContext,
  useTagGroupContext,
  setTagGroupListContext,
  useTagGroupListContext,
  NO_TAG_GROUP_LIST
} from "./tag-group.context.js";
export type {
  TagGroupRegistration,
  TagGroupRemoveRequest,
  TagGroupRemoveScope,
  TagGroupContext,
  TagGroupListContext
} from "./tag-group.context.js";

export { createTagGroupListHandlers } from "./tag-group.handlers.js";
export { getListTagIds } from "./tag-group.dom.js";
export { TAG_SLOT } from "./tag-group.constants.js";
