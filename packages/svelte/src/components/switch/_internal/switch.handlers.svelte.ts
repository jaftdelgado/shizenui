import type { SwitchState } from "./switch.state.svelte.js";

export function createSwitchHandlers(
  state: SwitchState,
  getChecked: () => boolean,
  setChecked: (value: boolean) => void,
  onCheckedChange?: (value: boolean) => void
) {
  function handleChange(): void {
    if (state.finalDisabled) return;
    const next = !getChecked();
    setChecked(next);
    onCheckedChange?.(next);
  }

  function handleKey(e: KeyboardEvent): void {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (e.type === "keyup") handleChange();
  }

  function handleContainerClick(e: MouseEvent): void {
    if (state.finalDisabled) return;

    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.closest("label")) return;

    handleChange();

    const container = e.currentTarget as HTMLDivElement;
    const input = container.querySelector<HTMLInputElement>('input[type="checkbox"]');
    input?.focus();
  }

  return { handleChange, handleKey, handleContainerClick };
}

export type SwitchHandlers = ReturnType<typeof createSwitchHandlers>;
