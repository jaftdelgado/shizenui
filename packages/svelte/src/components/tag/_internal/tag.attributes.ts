import { ariaBool, hasOwnAccessibleName, presence } from "../../../lib/utils/index.js";
import { TAG_SLOT } from "../../tag-group/_internal/index.js";
import type { TagContext } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";

type TagAriaState = Pick<
  TagState,
  | "isInGroup"
  | "id"
  | "disabled"
  | "isActive"
  | "isSelectable"
  | "isSelected"
  | "isRemovable"
  | "labelId"
>;

/**
 * The keys the row owns inside a group: its role and its roving `tabindex`, which is `undefined`
 * while the tag is disabled. Outside a group the consumer's win, so the caller passes these to
 * mergeProps only when the tag is in a group.
 */
export const TAG_ROW_OWNED_KEYS = ["role", "tabindex"] as const;

/**
 * Attributes of the Tag row.
 *
 * Only inside a group the row owns `role` and `tabindex` (see `TAG_ROW_OWNED_KEYS`). `aria-*` keys
 * with an `undefined` value are omitted by mergeProps, so the consumer's win.
 *
 * @param idProp - the id the consumer passed, if any. The resolved id (`state.id`) is rendered
 *   only inside a group; outside one only an explicit id is.
 * @param focusVisible - the focus-visible flag, which lives outside the state.
 * @param pressed - the pressed flag, which lives in the component's `PressState`.
 * @param hasOwnName - whether the consumer named the row (`aria-label` or `aria-labelledby` on the
 *   Tag). Then the row is not named from its text, which would win over the consumer's
 *   `aria-label`.
 *
 * Inside a group the row is named after its text (the label element), unless the consumer names it
 * with `aria-label` or `aria-labelledby`. The remove button is rendered outside the label element, so it is not part of the
 * name.
 */
export function getTagAttributes(
  state: TagAriaState,
  extras: {
    idProp: string | undefined;
    focusVisible: boolean;
    pressed: boolean;
    hasOwnName: boolean;
  }
) {
  const nameFromText = !extras.hasOwnName;

  return {
    id: state.isInGroup ? state.id : extras.idProp,
    ...(state.isInGroup
      ? {
          role: "row",
          // A disabled tag is not focusable, so it has no tabindex.
          tabindex: state.disabled ? undefined : state.isActive ? 0 : -1,
          "aria-labelledby": nameFromText ? state.labelId : undefined,
          "aria-selected": state.isSelectable ? state.isSelected : undefined,
          "aria-disabled": ariaBool(state.disabled)
        }
      : {}),
    "data-slot": TAG_SLOT,
    "data-selectable": presence(state.isSelectable),
    "data-selected": presence(state.isSelected),
    "data-disabled": presence(state.disabled),
    "data-removable": presence(state.isRemovable),
    "data-pressed": presence(extras.pressed),
    "data-focus-visible": presence(extras.focusVisible)
  };
}

/**
 * Attributes of the remove button.
 *
 * Its name is "Remove" followed by the tag's text: it names itself together with the label
 * element (`aria-labelledby` = its own id and the label's), so the text is never repeated in a
 * prop. An `aria-label` from the consumer is the whole name.
 *
 * @param id - the id the button is rendered with (the consumer's, or the default one).
 * @param ariaLabel - the label the consumer passed, if any.
 * @param ariaLabelledby - the `aria-labelledby` the consumer passed, if any.
 * @param pressed - the pressed flag, which lives in the button's `PressState`.
 */
export function getTagRemoveButtonAttributes(
  tagCtx: Pick<TagContext, "isTabbable" | "disabled" | "labelId">,
  options: {
    id: string | undefined;
    ariaLabel: string | null | undefined;
    ariaLabelledby: string | null | undefined;
    pressed: boolean;
  }
) {
  const { id, ariaLabel, ariaLabelledby, pressed } = options;
  const hasOwnName = hasOwnAccessibleName({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby
  });
  const nameFromText = !hasOwnName && id !== undefined && tagCtx.labelId;

  return {
    id,
    type: "button" as const,
    tabindex: tagCtx.isTabbable ? 0 : -1,
    "aria-label": ariaLabel || "Remove",
    "aria-labelledby": ariaLabelledby || (nameFromText ? `${id} ${tagCtx.labelId}` : undefined),
    disabled: tagCtx.disabled,
    "data-slot": "tag-remove-button",
    "data-pressed": presence(pressed)
  };
}
