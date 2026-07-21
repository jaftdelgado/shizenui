import type { CheckboxStateInstance } from "./checkbox.state.svelte.js";
import type { CheckboxClickEvent } from "./checkbox.types.js";

export function createCheckboxHandlers(options: {
  state: CheckboxStateInstance;
  setChecked: (value: boolean) => void;
  setIndeterminate: (value: boolean) => void;
  focus: { onKeyDown: () => void; onMouseDown: () => void };
  getOnClick?: () => ((e: CheckboxClickEvent) => void) | undefined;
}) {
  const { state, setChecked, setIndeterminate, focus, getOnClick } = options;

  function activate(): void {
    if (state.finalDisabled || state.finalReadonly) return;

    if (state.groupCtx.exists) {
      if (state.value !== undefined) state.groupCtx.toggleValue(state.value);
      return;
    }

    if (state.isIndeterminate) {
      setIndeterminate(false);
      setChecked(true);
      return;
    }

    setChecked(!state.isChecked);
  }

  function handleClick(e: CheckboxClickEvent): void {
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
      if (e.key === "Enter") return;
      if (e.repeat) return;
      e.currentTarget.setAttribute("data-pressed", "true");
      return;
    }

    if (e.key === "Enter") return;
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

export type CheckboxHandlers = ReturnType<typeof createCheckboxHandlers>;
