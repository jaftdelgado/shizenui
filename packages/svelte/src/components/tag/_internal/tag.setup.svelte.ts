// What the Tag wires up once, while it initializes: its context.
import { setTagContext } from "./tag.context.js";
import type { TagContext } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";

export function setupTagContexts(
  state: TagState,
  options: {
    registerRemoveButton: TagContext["registerRemoveButton"];
    getRemoveButtonClass: () => string;
  }
): void {
  setTagContext({
    get disabled() {
      return state.disabled;
    },
    get isRemovable() {
      return state.isRemovable;
    },
    get labelId() {
      return state.labelId;
    },
    get removeButtonId() {
      return state.removeButtonId;
    },
    get tabbable() {
      return !state.inGroup || state.isActive;
    },
    get removeButtonClass() {
      return options.getRemoveButtonClass();
    },
    // The button removes only its own tag, never the selection.
    remove: () => state.remove("self"),
    registerRemoveButton: options.registerRemoveButton,
    exists: true
  } satisfies TagContext);
}
