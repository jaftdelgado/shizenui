import type { SwitchState } from "./switch.state.svelte.js";

export function createSwitchHandlers(
  state: SwitchState,
  getChecked: () => boolean,
  setChecked: (value: boolean) => void,
  onCheckedChange?: (value: boolean) => void,
  getInputRef?: () => HTMLInputElement | null
) {
  function toggle(): void {
    if (state.finalDisabled) return;
    const next = !getChecked();
    setChecked(next);
    onCheckedChange?.(next);
  }

  // Called from native input onchange — intentionally uses toggle()
  // because Svelte controls checked state, not the native input.
  function handleChange(): void {
    toggle();
  }

  function handleKey(e: KeyboardEvent): void {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (e.type === "keyup") toggle();
  }

  function handleContainerClick(
    e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
  ): void {
    if (state.finalDisabled) return;

    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.closest("label")) return;

    toggle();
    getInputRef?.()?.focus();
  }

  return { handleChange, handleKey, handleContainerClick };
}

export type SwitchHandlers = ReturnType<typeof createSwitchHandlers>;
