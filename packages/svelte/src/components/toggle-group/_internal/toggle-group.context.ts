import { createContext } from "svelte";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupSelectionMode } from "./toggle-group.types.js";

export interface ToggleGroupRegistration {
  getRef: () => HTMLButtonElement | null;
  getDisabled: () => boolean;
}

export interface ToggleGroupContextValue {
  readonly variant: ToggleVariant;
  readonly size: ToggleSize;
  readonly disabled: boolean;
  readonly selectionMode: ToggleGroupSelectionMode;
  readonly selectedValues: Set<string>;
  readonly isSelected: (value: string) => boolean;
  readonly onToggle: (value: string) => void;
  readonly register: (id: string, entry: ToggleGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly isActive: (id: string) => boolean;
  readonly setActive: (id: string) => void;
}

export interface ToggleGroupContextResult extends ToggleGroupContextValue {
  readonly exists: boolean;
}

const [getToggleGroupContext, setToggleGroupContext] = createContext<ToggleGroupContextValue>();

function tryGetToggleGroupContext(): ToggleGroupContextValue | undefined {
  try {
    return getToggleGroupContext();
  } catch {
    return undefined;
  }
}

export { setToggleGroupContext };

export function useToggleGroupContext(): ToggleGroupContextResult {
  const context = tryGetToggleGroupContext();

  if (!context) {
    return {
      variant: "default" as ToggleVariant,
      size: "md" as ToggleSize,
      disabled: false,
      selectionMode: "single" as ToggleGroupSelectionMode, // irrelevant because exists is false
      selectedValues: new Set<string>(),
      isSelected: () => false,
      onToggle: () => {},
      register: () => {},
      unregister: () => {},
      isActive: () => false,
      setActive: () => {},
      exists: false
    } satisfies ToggleGroupContextResult;
  }

  return {
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get disabled() {
      return context.disabled;
    },
    get selectionMode() {
      return context.selectionMode;
    },
    get selectedValues() {
      return context.selectedValues;
    },
    get isSelected() {
      return context.isSelected;
    },
    get onToggle() {
      return context.onToggle;
    },
    get register() {
      return context.register;
    },
    get unregister() {
      return context.unregister;
    },
    get isActive() {
      return context.isActive;
    },
    get setActive() {
      return context.setActive;
    },
    get exists() {
      return true;
    }
  } satisfies ToggleGroupContextResult;
}
