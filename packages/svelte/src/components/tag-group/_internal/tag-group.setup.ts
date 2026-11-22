import { setTagGroupContext } from "./tag-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { TagGroupState } from "./tag-group.state.svelte.js";

export function setupTagGroupContexts(state: TagGroupState): void {
  setTagGroupContext(state);
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
