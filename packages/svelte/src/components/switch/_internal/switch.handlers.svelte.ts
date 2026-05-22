import type { SwitchState } from "./switch.state.svelte.js";

export function createSwitchHandlers(options: {
  state: SwitchState;
  getChecked: () => boolean;
  setChecked: (value: boolean) => void;
  onCheckedChange?: (value: boolean) => void;
  getInputRef?: () => HTMLInputElement | null;
}) {
  const { state, getChecked, setChecked, onCheckedChange, getInputRef } = options;

  function toggle(): void {
    if (state.finalDisabled) return;
    const next = !getChecked();
    setChecked(next);
    onCheckedChange?.(next);
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

  return { handleToggle: toggle, handleKey, handleContainerClick };
}

export type SwitchHandlers = ReturnType<typeof createSwitchHandlers>;
