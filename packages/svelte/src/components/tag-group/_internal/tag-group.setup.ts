import {
  NO_TAG_GROUP_LIST,
  setTagGroupContext,
  setTagGroupListContext
} from "./tag-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { TagGroupState } from "./tag-group.state.svelte.js";

export function setupTagGroupContexts(state: TagGroupState): void {
  setTagGroupContext(state);
  // A group nested in another group's list does not inherit that list.
  setTagGroupListContext(NO_TAG_GROUP_LIST);
  setContentSlotContext(state.field);

  setFieldStateContext({
    get invalid() {
      return state.invalid;
    },
    get disabled() {
      return state.disabled;
    },
    readonly: false,
    required: false,
    get id() {
      return state.id;
    },
    get labelId() {
      return state.field.labelId;
    },
    get descriptionId() {
      return state.field.descriptionId;
    },
    get errorId() {
      return state.field.errorId;
    },
    keepDescription: false
  });
}
