import type { RadioStateInstance } from "./radio.state.svelte.js";
import type { RadioClickEvent } from "./radio.types.js";

export function createRadioHandlers(options: {
  state: RadioStateInstance;
  setChecked: (val: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  getOnClick?: () => ((e: RadioClickEvent) => void) | undefined;
  getInputRef?: () => HTMLInputElement | null;
}) {
  const { state, setChecked, onCheckedChange, getOnClick, getInputRef } = options;

  function handleChange(): void {
    if (state.finalDisabled) return;

    if (state.groupCtx.exists) {
      state.groupCtx.setValue(state.value);
      return;
    }

    setChecked(true);
    onCheckedChange?.(true);
  }

  function handleKeyEnter(e: KeyboardEvent): void {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (e.type === "keyup") handleChange();
  }

  function handleContainerClick(e: RadioClickEvent): void {
    if (state.finalDisabled) return;

    const target = e.target as HTMLElement;
    if (target.closest("label")) return;

    handleChange();
    getInputRef?.()?.focus();
  }

  function handleClick(e: RadioClickEvent): void {
    handleContainerClick(e);
    getOnClick?.()?.(e);
  }

  return {
    handleChange,
    handleKeyEnter,
    handleClick
  };
}

export type RadioHandlers = ReturnType<typeof createRadioHandlers>;
