import { createOptionalContext } from "../../../lib/index.js";
import { EMPTY_CONTENT_SLOTS } from "../../../lib/runes/index.js";
import type { ContentSlotsField, RovingFocusItem } from "../../../lib/runes/index.js";
import type { TagGroupSelectionMode } from "./tag-group.types.js";
import type { TagRemovalRequest } from "./tag-group.removal.js";
import type { TagSize, TagVariant } from "../../tag/_internal/index.js";

export type TagGroupRegistration = RovingFocusItem;

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
  readonly remove: (value: string) => void;
  readonly register: (id: string, entry: TagGroupRegistration) => void;
  readonly unregister: (id: string, entry: TagGroupRegistration) => void;
  readonly focusedId: string | undefined;
  readonly isActive: (id: string) => boolean;
  readonly setActiveId: (id: string | undefined) => void;
  /**
   * Removes a tag and, if it held focus, moves focus to a neighbour once it is gone. Outside a
   * group it is just `remove`: there are no neighbours to move focus to.
   */
  readonly requestRemoval: (request: TagRemovalRequest) => void;
  readonly registerList: (id: string) => void;
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
  remove: () => {},
  register: () => {},
  unregister: () => {},
  focusedId: undefined,
  isActive: () => false,
  setActiveId: () => {},
  // The only NOOP member that does something: outside a group, removing a tag is only `remove()`.
  requestRemoval: ({ remove }: TagRemovalRequest) => remove(),
  registerList: () => {},
  unregisterList: () => {},
  exists: false
});

export const [useTagGroupContext, setTagGroupContext] =
  createOptionalContext<TagGroupContext>(NOOP_TAG_GROUP_CONTEXT);

/** Whether a component sits inside the TagGroup.List of its group. */
export interface TagGroupListContext {
  readonly exists: boolean;
}

/** Also set by the TagGroup root, so a group nested in another group's list starts outside one. */
export const NO_TAG_GROUP_LIST: TagGroupListContext = Object.freeze({ exists: false });

export const [useTagGroupListContext, setTagGroupListContext] =
  createOptionalContext<TagGroupListContext>(NO_TAG_GROUP_LIST);
