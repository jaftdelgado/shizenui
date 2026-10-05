import { setTagContext } from "./tag.context.js";
import type { TagContextValue } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";

export function setupTagContexts(state: TagState, options: { requestRemove: () => void }): void {
  setTagContext({
    get disabled() {
      return state.finalDisabled;
    },
    get isRemovable() {
      return state.isRemovable;
    },
    get textValue() {
      return state.textValue;
    },
    get id() {
      return state.id;
    },
    requestRemove: options.requestRemove
  } satisfies TagContextValue);
}
