import type { SwitchClickEvent } from "./switch.types.js";
import type { SwitchState } from "./switch.state.svelte.js";

export function createSwitchHandlers(options: {
  state: SwitchState;
  setChecked: (value: boolean) => void;
  focus: { onKeyDown: () => void; onMouseDown: () => void; onBlur: () => void };
  getValue: () => string | undefined;
  getOnClick?: () => ((event: SwitchClickEvent) => void) | undefined;
}) {
  const { state, setChecked, focus, getValue, getOnClick } = options;

  function toggle(): void {
    if (state.finalDisabled || state.finalReadonly) return;

    const value = getValue();
    if (state.groupCtx.exists) {
      if (value !== undefined) state.groupCtx.toggleValue(value);
      return;
    }

    const next = !state.finalChecked;
    setChecked(next);
  }

  function handleClick(event: SwitchClickEvent): void {
    toggle();
    getOnClick?.()?.(event);
  }

  function handleMouseDown(event: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    focus.onMouseDown();
    if (state.finalDisabled || state.finalReadonly) return;
    event.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleMouseUp(event: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    event.currentTarget.removeAttribute("data-pressed");
  }

  function handleMouseLeave(event: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    event.currentTarget.removeAttribute("data-pressed");
  }

  function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    focus.onKeyDown();
    if (event.key !== " " && event.key !== "Enter") return;

    event.preventDefault();
    if (event.repeat) return;

    event.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleKeyup(event: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (event.key !== " " && event.key !== "Enter") return;
    if (!event.currentTarget.hasAttribute("data-pressed")) return;

    event.currentTarget.removeAttribute("data-pressed");
    if (state.finalDisabled || state.finalReadonly) return;

    event.currentTarget.click();
  }

  function handleBlur(event: FocusEvent & { currentTarget: HTMLButtonElement }): void {
    focus.onBlur();
    event.currentTarget.removeAttribute("data-pressed");
  }

  return {
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleKeydown,
    handleKeyup,
    handleBlur
  };
}

export type SwitchHandlers = ReturnType<typeof createSwitchHandlers>;
