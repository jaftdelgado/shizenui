import type { ToggleState } from "./toggle.state.svelte.js";

type ToggleClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

export function createToggleHandlers(options: {
  state: ToggleState;
  getPressed: () => boolean;
  setPressed: (value: boolean) => void;
  onPressedChange?: (value: boolean) => void;
  getOnClick?: () => ((e: ToggleClickEvent) => void) | null | undefined;
}) {
  const { state, getPressed, setPressed, onPressedChange, getOnClick } = options;

  function toggle(): void {
    if (state.finalDisabled) return;
    const next = !getPressed();
    setPressed(next);
    onPressedChange?.(next);
  }

  function handleClick(event: ToggleClickEvent): void {
    if (event.detail === 0) return;
    toggle();
    getOnClick?.()?.(event);
  }

  function handleKey(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (e.key !== " " && e.key !== "Enter") return;
    if (e.type === "keydown") {
      e.preventDefault();
      if (e.repeat) return;
      e.currentTarget.setAttribute("data-pressed", "true");
    } else if (e.type === "keyup") {
      e.currentTarget.removeAttribute("data-pressed");
      toggle();
      getOnClick?.()?.(e as unknown as ToggleClickEvent);
    }
  }

  return { handleClick, handleKey };
}

export type ToggleHandlers = ReturnType<typeof createToggleHandlers>;
