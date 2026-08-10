import type { RadioStateInstance } from "./radio.state.svelte.js";
import type { RadioClickEvent } from "./radio.types.js";

export function createRadioHandlers(options: {
  state: RadioStateInstance;
  focus: { onKeyDown: () => void; onMouseDown: () => void };
  getOnClick?: () => ((e: RadioClickEvent) => void) | undefined;
}) {
  const { state, focus, getOnClick } = options;

  function activate(): void {
    if (state.finalDisabled || state.finalReadonly) return;
    state.groupCtx.setValue(state.value);
  }

  function handleClick(e: RadioClickEvent): void {
    activate();
    getOnClick?.()?.(e);
  }

  function handleMouseDown(e: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    focus.onMouseDown();
    if (state.finalDisabled || state.finalReadonly) return;
    e.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleMouseUp(e: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  function handleMouseLeave(e: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  function handleKeydown(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.type === "keydown") focus.onKeyDown();

    if (e.key !== "Enter" && e.key !== " ") return;

    if (e.type === "keydown") {
      e.preventDefault();
      if (e.repeat) return;
      e.currentTarget.setAttribute("data-pressed", "true");
      return;
    }

    if (!e.currentTarget.hasAttribute("data-pressed")) return;
    e.currentTarget.removeAttribute("data-pressed");
    activate();
  }

  return {
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleKeydown
  };
}

export type RadioHandlers = ReturnType<typeof createRadioHandlers>;
