import { ariaBool, hasOwnAccessibleName, presence } from "../../../lib/utils/index.js";
import type { AccessibleNameProps } from "../../../lib/utils/index.js";
import { TAG_GROUP_LIST_SLOT, TAG_GROUP_SLOT } from "./tag-group.constants.js";
import type { TagGroupContext } from "./tag-group.context.js";

/** Attributes of the TagGroup root element. */
export function getTagGroupAttributes(
  ctx: Pick<TagGroupContext, "disabled" | "invalid" | "selectionMode">
) {
  return {
    "data-slot": TAG_GROUP_SLOT,
    "data-disabled": presence(ctx.disabled),
    "data-invalid": presence(ctx.invalid),
    "data-selection-mode": ctx.selectionMode
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
  ctx: Pick<TagGroupContext, "field" | "ariaLabel" | "ariaLabelledby">,
  consumer: TagGroupListConsumerAria
): { "aria-label"?: string; "aria-labelledby"?: string } {
  if (hasOwnAccessibleName(consumer)) return {};
  if (ctx.field.hasLabel) return { "aria-labelledby": ctx.field.labelId };
  return {
    "aria-labelledby": ctx.ariaLabelledby || undefined,
    "aria-label": ctx.ariaLabel || undefined
  };
}

/**
 * Attributes of the TagGroup.List element (the grid). `tabindex` is always present as a key:
 * mergeProps lets the component win on it even when the value is `undefined`.
 */
export function getTagGroupListAttributes(
  ctx: Pick<
    TagGroupContext,
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
  const nameProps = resolveListAccessibleName(ctx, consumer);

  const describedBy =
    [consumer["aria-describedby"], ctx.field.describedBy].filter(Boolean).join(" ") || undefined;

  // The list is the tab stop until a tag has been focused, then that tag takes over. It stays
  // focusable (tabindex -1) after that, so code can still focus it (e.g. when the last tag is
  // removed); a pointer never does. It only holds focus while the entry handler redirects it to a
  // tag, or when there is no tag to redirect to. It must not depend on the tag registry: on the
  // server the list renders before its tags register, and the SSR output would have no tab stop
  // at all.
  const tabindex = ctx.tabStopId !== undefined ? -1 : ctx.disabled ? undefined : 0;

  // aria-invalid is kept on the grid even though the linter only lists it for some roles:
  // it is the element that owns the tags, and dropping it would hide the invalid state from AT.
  return {
    role: "grid",
    "data-slot": TAG_GROUP_LIST_SLOT,
    tabindex,
    ...nameProps,
    "aria-describedby": describedBy,
    "aria-multiselectable": ariaBool(ctx.selectionMode === "multiple"),
    "aria-disabled": ariaBool(ctx.disabled),
    "aria-invalid": ariaBool(ctx.invalid),
    "data-disabled": presence(ctx.disabled),
    "data-invalid": presence(ctx.invalid)
  };
}
