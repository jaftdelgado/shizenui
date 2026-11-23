import type { FocusVisible } from "../../../lib/runes/index.js";
import { isFromFocusableChild } from "../../../lib/utils/index.js";
import type { TagContext } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";
import type { TagClickEvent } from "./tag.types.js";

type TagHandlersState = Pick<TagState, "disabled" | "canRemove" | "select" | "activate" | "remove">;

/**
 * The event handlers of the Tag row that are not about being pressed: the pressed state and the
 * activation from the keyboard are `PressState`'s, which turns `Enter` and `Space` into a `click`.
 * `handleClick` is the only place that activates.
 */
export function createTagHandlers(options: {
  state: TagHandlersState;
  focus: Pick<FocusVisible, "onFocus" | "onBlur">;
  getOnClick?: () => ((e: TagClickEvent) => void) | undefined;
}) {
  const { state, focus, getOnClick } = options;

  function handleClick(e: TagClickEvent): void {
    // A click on a focusable child (the remove button, other interactive content) belongs to the
    // child: it does not change the selection, and the consumer's `onclick` does not run.
    if (isFromFocusableChild(e.target, e.currentTarget)) return;
    // Not a guard of `select`, which guards itself: the consumer's `onclick` does not run on a
    // disabled tag either (see `TagProps`).
    if (state.disabled) return;
    // Shift+click extends the selection from the anchor, as Shift+arrows do.
    state.select({ extend: e.shiftKey });
    getOnClick?.()?.(e);
  }

  function handleFocus(): void {
    focus.onFocus();
    state.activate();
  }

  function handleKeyDown(e: KeyboardEvent & { currentTarget: HTMLDivElement }): void {
    if (e.target !== e.currentTarget) return;
    if (e.key !== "Delete" && e.key !== "Backspace") return;
    // Decides whether the key is the tag's, and only then the browser's default is cancelled.
    // `remove` guards itself anyway.
    if (!state.canRemove) return;

    e.preventDefault();
    // On a selected tag, the key removes every selected tag.
    state.remove("selection");
  }

  return {
    /** The event props of the Tag row, ready to be spread. */
    props: {
      onclick: handleClick,
      onkeydown: handleKeyDown,
      onfocus: handleFocus,
      onblur: focus.onBlur
    }
  };
}

/**
 * The event handlers of the remove button, ready to be spread before the consumer's: mergeProps
 * composes them, these first.
 */
export function createTagRemoveButtonHandlers(tagCtx: Pick<TagContext, "remove">) {
  function handleClick(): void {
    // The click also reaches the tag, which ignores a click that comes from a focusable child.
    tagCtx.remove();
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
