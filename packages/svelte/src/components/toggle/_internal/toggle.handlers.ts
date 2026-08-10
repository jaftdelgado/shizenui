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
    toggle();
    getOnClick?.()?.(event);
  }

  function handleKeydown(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.key !== " " && e.key !== "Enter") return;

    e.preventDefault();
    if (e.repeat) return;

    e.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleKeyup(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.key !== " " && e.key !== "Enter") return;
    if (!e.currentTarget.hasAttribute("data-pressed")) return;

    e.currentTarget.removeAttribute("data-pressed");
    if (state.finalDisabled) return;

    e.currentTarget.click();
  }

  function handleBlur(e: FocusEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.currentTarget.hasAttribute("data-pressed")) {
      e.currentTarget.removeAttribute("data-pressed");
    }
  }

  return { handleClick, handleKeydown, handleKeyup, handleBlur };
}

export type ToggleHandlers = ReturnType<typeof createToggleHandlers>;
