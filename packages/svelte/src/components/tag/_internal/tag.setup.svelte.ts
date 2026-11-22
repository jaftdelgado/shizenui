// What the Tag wires up once, while it initializes: its context, its registration in the group and
// the slot of its remove button.
import { untrack } from "svelte";
import type { Snippet } from "svelte";
import { devWarn } from "../../../lib/utils/index.js";
import { setTagContext } from "./tag.context.js";
import type { TagContext } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";

/** The remove button declared inside a Tag, which the Tag renders after its text. */
export interface TagRemoveButtonSlot {
  readonly current: Snippet | undefined;
  readonly register: (button: Snippet) => () => void;
}

/**
 * `<Tag.RemoveButton>` is declared among the tag's children, but it is not rendered there: it
 * hands its markup (a snippet) to the Tag, which renders it after the element that wraps its
 * text. That element names the row and the button (`aria-labelledby`), and a button inside it
 * would add its own name to both. The snippet still belongs to the declaration: its props, its
 * children and its `bind:ref` stay there.
 *
 * The declaration registers while it initializes, so the slot is filled before the Tag renders the
 * markup that follows its children, on the server too. Only one remove button per tag is
 * supported: the first one wins.
 */
export function createTagRemoveButtonSlot(): TagRemoveButtonSlot {
  // Raw: the snippet is compared by identity when it is withdrawn.
  let current = $state.raw<Snippet | undefined>(undefined);

  return {
    get current() {
      return current;
    },
    register(button) {
      // Called while the declaration initializes, maybe inside one of its effects: reading the slot
      // must not become a dependency of the caller.
      return untrack(() => {
        if (current !== undefined) {
          devWarn(
            "Tag.RemoveButton",
            "Only one remove button per <Tag> is supported. The extra one is not rendered."
          );
          return () => {};
        }

        current = button;
        return () => {
          if (current === button) current = undefined;
        };
      });
    }
  };
}

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

export function setupTagGroupRegistration(state: TagState): void {
  // The id can change, so this is an effect: it re-registers and the cleanup removes the id it
  // captured.
  $effect.pre(() => {
    const id = state.id;
    state.registerInGroup(id);

    return () => {
      state.unregisterFromGroup(id);
    };
  });
}
