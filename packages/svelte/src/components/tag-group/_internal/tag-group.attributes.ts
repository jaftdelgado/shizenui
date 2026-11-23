import { ariaBool, hasOwnAccessibleName, presence } from "../../../lib/utils/index.js";
import type { AccessibleNameProps } from "../../../lib/utils/index.js";
import { TAG_GROUP_LIST_SLOT, TAG_GROUP_SLOT } from "./tag-group.constants.js";
import type { TagGroupContext, TagGroupListApi } from "./tag-group.context.js";

/** Attributes of the TagGroup root element. */
export function getTagGroupAttributes(
  state: Pick<TagGroupContext, "disabled" | "invalid" | "selectionMode">
) {
  return {
    "data-slot": TAG_GROUP_SLOT,
    "data-disabled": presence(state.disabled),
    "data-invalid": presence(state.invalid),
    "data-selection-mode": state.selectionMode
  };
}

/** The ARIA attributes the consumer passed to TagGroup.List itself. */
export interface TagGroupListConsumerAria extends AccessibleNameProps {
  "aria-describedby"?: string | null;
}

/**
 * Accessible name of the list, in order of priority: aria-label/aria-labelledby on the list, the
 * group's Label, then aria-label/aria-labelledby passed to the TagGroup root.
 */
function resolveListAccessibleName(
  groupCtx: Pick<TagGroupListApi, "field" | "ariaLabel" | "ariaLabelledby">,
  consumer: TagGroupListConsumerAria
): { "aria-label"?: string; "aria-labelledby"?: string } {
  if (hasOwnAccessibleName(consumer)) return {};
  if (groupCtx.field.hasLabel) return { "aria-labelledby": groupCtx.field.labelId };
  return {
    "aria-labelledby": groupCtx.ariaLabelledby || undefined,
    "aria-label": groupCtx.ariaLabel || undefined
  };
}

/** The list owns its role and its tab stop: the consumer's `role` and `tabindex` never win. */
export const TAG_GROUP_LIST_OWNED_KEYS = ["role", "tabindex"] as const;

/**
 * Attributes of the TagGroup.List element (the grid). Its `tabindex` is `undefined` while the
 * group is disabled: the caller passes `TAG_GROUP_LIST_OWNED_KEYS` to mergeProps so that the
 * consumer's does not take its place.
 */
export function getTagGroupListAttributes(
  groupCtx: Pick<
    TagGroupListApi,
    | "selectionMode"
    | "disabled"
    | "invalid"
    | "tabStopId"
    | "field"
    | "ariaLabel"
    | "ariaLabelledby"
  >,
  consumer: TagGroupListConsumerAria
) {
  const nameProps = resolveListAccessibleName(groupCtx, consumer);

  const describedBy =
    [consumer["aria-describedby"], groupCtx.field.describedBy].filter(Boolean).join(" ") ||
    undefined;

  // The list is the tab stop until a tag has been focused, then that tag takes over. It stays
  // focusable (tabindex -1) after that, so code can still focus it (e.g. when the last tag is
  // removed); a pointer never does. It only holds focus while the entry handler redirects it to a
  // tag, or when there is no tag to redirect to. It must not depend on the tag registry: on the
  // server the list renders before its tags register, and the SSR output would have no tab stop
  // at all.
  const tabindex = groupCtx.tabStopId !== undefined ? -1 : groupCtx.disabled ? undefined : 0;

  // aria-invalid is kept on the grid even though the linter only lists it for some roles:
  // it is the element that owns the tags, and dropping it would hide the invalid state from AT.
  return {
    role: "grid",
    "data-slot": TAG_GROUP_LIST_SLOT,
    tabindex,
    ...nameProps,
    "aria-describedby": describedBy,
    "aria-multiselectable": ariaBool(groupCtx.selectionMode === "multiple"),
    "aria-disabled": ariaBool(groupCtx.disabled),
    "aria-invalid": ariaBool(groupCtx.invalid),
    "data-disabled": presence(groupCtx.disabled),
    "data-invalid": presence(groupCtx.invalid)
  };
}
