import type { Snippet } from "svelte";
import { createOptionalContext } from "../../../lib/contexts/index.js";

export interface TagContext {
  readonly exists: boolean;
  readonly disabled: boolean;
  readonly isRemovable: boolean;
  /** The id of the element that wraps the tag's text, which names the row and the remove button. */
  readonly labelId: string | undefined;
  /** The default id of the remove button, which names itself together with the label. */
  readonly removeButtonId: string | undefined;
  /** Whether the remove button belongs in the tab sequence (only the active tag of a group). */
  readonly isTabbable: boolean;
  /** Removes this tag only, not the selection: it is what the remove button does. */
  readonly remove: () => void;
  /**
   * Hands the markup of a declared remove button to the Tag, which renders it after the tag's
   * text, so that the text can name the row and the button without the button's own name getting
   * mixed into it. Returns the function that withdraws it.
   */
  readonly registerRemoveButton: (button: Snippet) => () => void;
}

const NOOP_TAG_CONTEXT: TagContext = Object.freeze({
  disabled: false,
  isRemovable: false,
  labelId: undefined,
  removeButtonId: undefined,
  isTabbable: false,
  remove: () => {},
  registerRemoveButton: () => () => {},
  exists: false
});

export const [useTagContext, setTagContext] = createOptionalContext<TagContext>(NOOP_TAG_CONTEXT);
