import type { ToggleState } from "./toggle.state.svelte.js";
import type { ToggleClickEvent } from "./toggle.types.js";

export function createToggleHandlers(options: {
  state: ToggleState;
  getValue: () => string | undefined;
  getOnClick?: () => ((e: ToggleClickEvent) => void) | null | undefined;
}) {
  const { state, getValue, getOnClick } = options;

  function toggle(): void {
    state.toggle(getValue());
  }

  function handleClick(event: ToggleClickEvent): void {
    if (event.detail === 0) return;
    toggle();
    getOnClick?.()?.(event);
  }

  function handleKey(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.key !== " " && e.key !== "Enter") return;
    if (e.type === "keydown") {
      e.preventDefault();
      if (e.repeat) return;
      e.currentTarget.setAttribute("data-pressed", "true");
    } else if (e.type === "keyup") {
      if (!e.currentTarget.hasAttribute("data-pressed")) return;
      e.currentTarget.removeAttribute("data-pressed");
      toggle();
    }
  }

  function handleBlur(e: FocusEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.currentTarget.hasAttribute("data-pressed")) {
      e.currentTarget.removeAttribute("data-pressed");
    }
  }

  return { handleClick, handleKey, handleBlur };
}

export type ToggleHandlers = ReturnType<typeof createToggleHandlers>;
