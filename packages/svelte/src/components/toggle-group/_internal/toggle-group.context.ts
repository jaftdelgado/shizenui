import { createContext } from "svelte";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupSelectionMode } from "./toggle-group.types.js";

export interface ToggleGroupRegistration {
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
  readonly setActiveId: (id: string) => void;
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
      get variant() {
        return "default" as ToggleVariant;
      },
      get size() {
        return "md" as ToggleSize;
      },
      get disabled() {
        return false;
      },
      get selectionMode() {
        return "single" as ToggleGroupSelectionMode;
      },
      get selectedValues() {
        return new Set<string>();
      },
      isSelected(_value: string) {
        return false;
      },
      onToggle(_value: string) {},
      register(_id: string, _entry: ToggleGroupRegistration) {},
      unregister(_id: string) {},
      isActive(_id: string) {
        return false;
      },
      setActiveId(_id: string) {},
      get exists() {
        return false;
      }
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
    isSelected(value: string) {
      return context.isSelected(value);
    },
    onToggle(value: string) {
      return context.onToggle(value);
    },
    register(id: string, entry: ToggleGroupRegistration) {
      return context.register(id, entry);
    },
    unregister(id: string) {
      return context.unregister(id);
    },
    isActive(id: string) {
      return context.isActive(id);
    },
    setActiveId(id: string) {
      return context.setActiveId(id);
    },
    get exists() {
      return true;
    }
  } satisfies ToggleGroupContextResult;
}
