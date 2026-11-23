import { createOptionalContext } from "../../../lib/contexts/index.js";
import { EMPTY_CONTENT_SLOTS } from "../../../lib/runes/index.js";
import type { ContentSlotsField, RovingFocusItem } from "../../../lib/runes/index.js";
import type { TagGroupSelectionMode } from "./tag-group.types.js";
import type { TagSize, TagVariant } from "../../tag/_internal/index.js";

/** What a tag tells its group about itself when it registers. */
export interface TagGroupRegistration extends RovingFocusItem {
  getValue: () => string;
  /** Whether it can be removed right now (removable and enabled). */
  canRemove: () => boolean;
  /** The tag's element. The group only uses it to take focus off the tag when it is removed. */
  getElement: () => HTMLElement | null;
  /** Runs the tag's own `onRemove`, if any. The group's `onRemove` is the group's job. */
  emitRemove: () => void;
}

/** Which tags a removal takes: the tag alone, or every selected tag when the tag is selected. */
export type TagGroupRemoveScope = "self" | "selection";

export interface TagGroupRemoveRequest {
  readonly entry: TagGroupRegistration;
  readonly scope: TagGroupRemoveScope;
}

/** What a TagGroup.List tells its group when it registers. */
export interface TagGroupListRegistration {
  /**
   * The ids of the enabled tags of the list, in the order the user sees them. Empty while the
   * list has no element (on the server).
   */
  readonly getOrderedIds: () => readonly string[];
}

export interface TagGroupSelectRequest {
  readonly id: string;
  readonly value: string;
  /** Shift+click: select the range from the anchor instead of toggling the tag. */
  readonly extend: boolean;
}

/** What every member of the group reads. */
interface TagGroupSharedApi {
  readonly exists: boolean;
  readonly selectionMode: TagGroupSelectionMode;
  readonly disabled: boolean;
  readonly setActiveId: (id: string | undefined) => void;
}

/** What a Tag uses. */
export interface TagGroupItemApi extends TagGroupSharedApi {
  readonly isRemovable: boolean;
  /** The variant and size the group gives its tags; `undefined` leaves them to the styles. */
  readonly variant: TagVariant | undefined;
  readonly size: TagSize | undefined;
  readonly isSelected: (value: string) => boolean;
  readonly isActive: (id: string) => boolean;
  /**
   * Selects as a click on a tag does: toggles `value`, or, with `extend` in multiple mode, selects
   * the range from the anchor to the tag with `id`. In the other modes `extend` is ignored.
   */
  readonly select: (request: TagGroupSelectRequest) => void;
  /**
   * Whether `element` sits inside a `TagGroup.List` of this group, and not only inside the list of
   * a group nested in it or around it. The development warnings of the Tag read it.
   */
  readonly isInList: (element: Element) => boolean;
  /**
   * Removes the tag, or every selected tag that can be removed when the scope is `"selection"` and
   * the tag is selected: each one's own `onRemove` runs, then the group's `onRemove` once, with
   * all their values. If the tag held focus, focus moves to a neighbour once it is gone.
   */
  readonly remove: (request: TagGroupRemoveRequest) => void;
  readonly register: (id: string, entry: TagGroupRegistration) => void;
  readonly unregister: (id: string, entry: TagGroupRegistration) => void;
}

/** What TagGroup.List uses. */
export interface TagGroupListApi extends TagGroupSharedApi {
  readonly invalid: boolean;
  /** aria-label / aria-labelledby passed to the TagGroup root, applied to the grid instead. */
  readonly ariaLabel: string | undefined;
  readonly ariaLabelledby: string | undefined;
  /** The group Label, Description and FieldError: their ids and the describedby rule. */
  readonly field: ContentSlotsField;
  /**
   * The tag that holds the tab stop: the last active one, unless it is gone or disabled. It does
   * not mean the tag has DOM focus. Without one, the list is the tab stop.
   */
  readonly tabStopId: string | undefined;
  /**
   * Selects the range from the anchor (the last tag selected) to the tag with `targetId`
   * (multiple mode only). `orderedIds` are the ids of the enabled tags in the order the user sees
   * them, when the caller already has them; without them the group asks its list.
   */
  readonly extendSelectionTo: (targetId: string, orderedIds?: readonly string[]) => void;
  readonly registerList: (id: string, list: TagGroupListRegistration) => void;
  readonly unregisterList: (id: string) => void;
}

export type TagGroupContext = TagGroupItemApi & TagGroupListApi;

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
  select: () => {},
  isInList: () => false,
  extendSelectionTo: () => {},
  remove: () => {},
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
