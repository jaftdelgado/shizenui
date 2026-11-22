import { createOptionalContext } from "../../../lib/index.js";
import { EMPTY_CONTENT_SLOTS } from "../../../lib/runes/index.js";
import type { ContentSlotsField, RovingFocusItem } from "../../../lib/runes/index.js";
import type { TagGroupSelectionMode } from "./tag-group.types.js";
import type { TagSize, TagVariant } from "../../tag/_internal/index.js";

/** What a tag tells its group about itself when it registers. */
export interface TagGroupRegistration extends RovingFocusItem {
  getValue: () => string;
  /** Whether it can be removed right now (removable and enabled). */
  canRemove: () => boolean;
  /** Runs the tag's own `onRemove`, if any. The group's `onRemove` is the group's job. */
  emitRemove: () => void;
}

/** Which tags a removal takes: the tag alone, or every selected tag when the tag is selected. */
export type TagGroupRemoveScope = "self" | "selection";

export interface TagGroupRemoveRequest {
  readonly entry: TagGroupRegistration;
  /** The tag's element, to move focus off it if it held focus. */
  readonly row: HTMLElement | null;
  readonly scope: TagGroupRemoveScope;
}

export interface TagGroupContext {
  readonly exists: boolean;
  readonly selectionMode: TagGroupSelectionMode;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly isRemovable: boolean;
  /** The variant and size the group gives its tags; `undefined` leaves them to the styles. */
  readonly variant: TagVariant | undefined;
  readonly size: TagSize | undefined;
  /** aria-label / aria-labelledby passed to the TagGroup root, applied to the grid instead. */
  readonly ariaLabel: string | undefined;
  readonly ariaLabelledby: string | undefined;
  /** The group Label, Description and FieldError: their ids and the describedby rule. */
  readonly field: ContentSlotsField;
  readonly isSelected: (value: string) => boolean;
  readonly toggleValue: (value: string) => void;
  /**
   * Selects the range from the anchor (the last tag selected) to the tag with `targetId`
   * (multiple mode only). `rows` are the enabled rows of the list in DOM order, when the caller
   * already has them; without them the group reads them from its list.
   */
  readonly extendSelectionTo: (targetId: string, rows?: readonly HTMLElement[]) => void;
  /**
   * Removes the tag, or every selected tag that can be removed when the scope is `"selection"` and
   * the tag is selected: each one's own `onRemove` runs, then the group's `onRemove` once, with
   * all their values. If the tag held focus, focus moves to a neighbour once it is gone. Outside a
   * group there are no neighbours to move focus to and no group `onRemove`: only the tag's own
   * `onRemove` runs.
   */
  readonly remove: (request: TagGroupRemoveRequest) => void;
  readonly register: (id: string, entry: TagGroupRegistration) => void;
  readonly unregister: (id: string, entry: TagGroupRegistration) => void;
  /**
   * The tag that holds the tab stop: the last active one, unless it is gone or disabled. It does
   * not mean the tag has DOM focus. Without one, the list is the tab stop.
   */
  readonly tabStopId: string | undefined;
  readonly isActive: (id: string) => boolean;
  readonly setActiveId: (id: string | undefined) => void;
  /** `getElement` reads the list's element when it is needed: it does not exist yet on the server. */
  readonly registerList: (id: string, getElement: () => HTMLElement | null) => void;
  readonly unregisterList: (id: string) => void;
}

const NOOP_TAG_GROUP_CONTEXT: TagGroupContext = Object.freeze({
  selectionMode: "none",
  disabled: false,
  invalid: false,
  isRemovable: false,
  // No value: the defaults come from the styles package (`defaultVariants` of tagStyles), which
  // applies them to whatever arrives as `undefined`.
  variant: undefined,
  size: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  field: EMPTY_CONTENT_SLOTS,
  isSelected: () => false,
  toggleValue: () => {},
  extendSelectionTo: () => {},
  // The only NOOP member that does something: outside a group the tag's own `onRemove` still runs
  // (there are no neighbours to move focus to, and no group `onRemove`).
  remove: ({ entry }: TagGroupRemoveRequest) => entry.emitRemove(),
  register: () => {},
  unregister: () => {},
  tabStopId: undefined,
  isActive: () => false,
  setActiveId: () => {},
  registerList: () => {},
  unregisterList: () => {},
  exists: false
});

export const [useTagGroupContext, setTagGroupContext] =
  createOptionalContext<TagGroupContext>(NOOP_TAG_GROUP_CONTEXT);
