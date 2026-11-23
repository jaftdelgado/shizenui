export type { TagGroupProps, TagGroupListProps, TagGroupSelectionMode } from "./tag-group.types.js";

export { TagGroupState } from "./tag-group.state.svelte.js";
export {
  TAG_GROUP_LIST_OWNED_KEYS,
  getTagGroupAttributes,
  getTagGroupListAttributes
} from "./tag-group.attributes.js";

export { setupTagGroupWarnings, setupTagGroupListWarnings } from "./tag-group.warnings.js";

export { getListRowIds, isInsideOwnList } from "./tag-group.queries.js";

export { setTagGroupContext, useTagGroupContext } from "./tag-group.context.js";
export type {
  TagGroupListRegistration,
  TagGroupRegistration,
  TagGroupRemoveRequest,
  TagGroupRemoveScope,
  TagGroupItemApi,
  TagGroupListApi,
  TagGroupContext
} from "./tag-group.context.js";

export { createTagGroupListHandlers } from "./tag-group.handlers.js";
export { TAG_SLOT } from "./tag-group.constants.js";
