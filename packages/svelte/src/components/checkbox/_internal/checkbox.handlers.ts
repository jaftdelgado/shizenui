import type { CheckboxStateInstance } from "./checkbox.state.svelte.js";

export function createCheckboxHandlers(
  state: CheckboxStateInstance,
  getChecked: () => boolean,
  setChecked: (val: boolean) => void,
  getIndeterminate: () => boolean,
  setIndeterminate: (val: boolean) => void,
  onCheckedChange?: (val: boolean) => void,
  onIndeterminateChange?: (val: boolean) => void
) {
  function handleChange() {
    if (state.finalDisabled) return;

    if (state.groupCtx.exists) {
      if (state.value === undefined) return;
      state.groupCtx.toggleValue(state.value);
      return;
    }

    if (getIndeterminate()) {
      setIndeterminate(false);
      onIndeterminateChange?.(false);
      setChecked(true);
      onCheckedChange?.(true);
      return;
    }

    const next = !getChecked();
    setChecked(next);
    onCheckedChange?.(next);
  }

  function handleKeyEnter(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (e.type === "keyup") handleChange();
  }

  function handleContainerClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.closest("label")) return;
    handleChange();
    const container = e.currentTarget as HTMLDivElement;
    const input = container.querySelector("input");
    input?.focus();
  }

  return { handleChange, handleKeyEnter, handleContainerClick };
}

export type CheckboxHandlers = ReturnType<typeof createCheckboxHandlers>;
