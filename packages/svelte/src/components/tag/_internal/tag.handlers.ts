import type { FocusVisible } from "../../../lib/runes/index.js";
import { isFromFocusableChild } from "../../../lib/utils/index.js";
import type { TagContext } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";
import type { TagClickEvent } from "./tag.types.js";

type TagHandlersState = Pick<
  TagState,
  | "disabled"
  | "canRemove"
  | "isRangeSelectable"
  | "toggle"
  | "extendSelection"
  | "activate"
  | "requestRemoval"
>;

/**
 * The event handlers of the Tag row that are not about being pressed: the pressed state and the
 * activation from the keyboard are `PressState`'s, which turns `Enter` and `Space` into a `click`.
 * `handleClick` is the only place that activates.
 */
export function createTagHandlers(options: {
  state: TagHandlersState;
  focus: Pick<FocusVisible, "onFocus" | "onBlur">;
  getRef: () => HTMLDivElement | null;
  getOnClick?: () => ((e: TagClickEvent) => void) | undefined;
}) {
  const { state, focus, getRef, getOnClick } = options;

  function handleClick(e: TagClickEvent): void {
    // A click on a focusable child (the remove button, other interactive content) belongs to the
    // child: it does not change the selection, and the consumer's `onclick` does not run.
    if (isFromFocusableChild(e.target, e.currentTarget)) return;
    if (state.disabled) return;
    // Shift+click selects the range from the anchor, as Shift+arrows do.
    if (e.shiftKey && state.isRangeSelectable) state.extendSelection(e.currentTarget);
    else state.toggle();
    getOnClick?.()?.(e);
  }

  function handleFocus(): void {
    focus.onFocus();
    state.activate();
  }

  function handleKeyDown(e: KeyboardEvent & { currentTarget: HTMLDivElement }): void {
    if (e.target !== e.currentTarget) return;
    if (e.key !== "Delete" && e.key !== "Backspace") return;
    if (!state.canRemove) return;

    e.preventDefault();
    // On a selected tag, the key removes every selected tag.
    requestRemove({ withSelection: true });
  }

  /** The remove button calls it without options: it only removes its own tag. */
  function requestRemove(options: { withSelection?: boolean } = {}): void {
    if (!state.canRemove) return;
    state.requestRemoval(getRef(), options);
  }

  return {
    /** The event props of the Tag row, ready to be spread. */
    props: {
      onclick: handleClick,
      onkeydown: handleKeyDown,
      onfocus: handleFocus,
      onblur: focus.onBlur
    },
    requestRemove
  };
}

/**
 * The event handlers of the remove button, ready to be spread before the consumer's: mergeProps
 * composes them, these first.
 */
export function createTagRemoveButtonHandlers(ctx: Pick<TagContext, "requestRemove">) {
  function handleClick(): void {
    // The click also reaches the tag, which ignores a click that comes from a focusable child.
    ctx.requestRemove();
  }

  function handleMouseDown(e: MouseEvent): void {
    // Exception to "mousedown does nothing": it keeps the browser from moving focus to this button.
    e.preventDefault();
  }

  return {
    onclick: handleClick,
    onmousedown: handleMouseDown
  };
}
