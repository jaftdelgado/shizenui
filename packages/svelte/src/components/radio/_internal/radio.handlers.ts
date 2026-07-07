import type { RadioStateInstance } from "./radio.state.svelte.js";

export function createRadioHandlers(
  state: RadioStateInstance,
  setChecked: (val: boolean) => void,
  getOnClick: () =>
    | ((e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void)
    | undefined
) {
  function handleChange() {
    if (state.finalDisabled) return;
    if (state.groupCtx.exists) {
      state.groupCtx.setValue(state.value);
    } else {
      setChecked(true);
    }
  }

  function handleKeyEnter(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (e.type === "keyup") handleChange();
  }

  function handleContainerClick(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    const target = e.target as HTMLElement;
    if (target.closest("label")) return;
    handleChange();
    const input = e.currentTarget.querySelector('input[type="radio"]') as HTMLInputElement | null;
    input?.focus();
  }

  function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    handleContainerClick(e);
    getOnClick()?.(e);
  }

  return {
    handleChange,
    handleKeyEnter,
    handleClick
  };
}

export type RadioHandlers = ReturnType<typeof createRadioHandlers>;
