import type { RadioStateInstance } from "./radio.state.svelte.js";
import type { RadioClickEvent } from "./radio.types.js";

export function createRadioHandlers(options: {
  state: RadioStateInstance;
  setChecked: (val: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  getOnClick?: () => ((e: RadioClickEvent) => void) | undefined;
}) {
  const { state, setChecked, onCheckedChange, getOnClick } = options;

  function activate(): void {
    if (state.finalDisabled || state.finalReadonly) return;
    if (state.groupCtx.exists) {
      state.groupCtx.setValue(state.value);
      return;
    }

    setChecked(true);
    onCheckedChange?.(true);
  }

  function handleClick(e: RadioClickEvent): void {
    activate();
    getOnClick?.()?.(e);
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key !== "Enter" && e.key !== " ") return;

    if (e.type === "keydown") {
      e.preventDefault();
      return;
    }

    activate();
  }

  return {
    handleClick,
    handleKeydown
  };
}

export type RadioHandlers = ReturnType<typeof createRadioHandlers>;
