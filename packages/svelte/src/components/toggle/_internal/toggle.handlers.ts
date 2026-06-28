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

  function handleClick(event: ToggleClickEvent): void {
    if (state.finalDisabled) return;

    const next = !getPressed();
    setPressed(next);
    onPressedChange?.(next);
    getOnClick?.()?.(event);
  }

  return { handleClick };
}

export type ToggleHandlers = ReturnType<typeof createToggleHandlers>;
