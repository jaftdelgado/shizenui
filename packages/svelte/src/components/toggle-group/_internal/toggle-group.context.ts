import { getContext, setContext } from "svelte";
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
  readonly selectionMode: ToggleGroupSelectionMode | undefined;
  readonly selectedValues: Set<string>;
  readonly onToggle: (value: string) => void;
  readonly register: (id: string, entry: ToggleGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly isActive: (id: string) => boolean;
  readonly setActive: (id: string) => void;
}

export interface ToggleGroupContextResult {
  readonly variant: ToggleVariant;
  readonly size: ToggleSize;
  readonly disabled: boolean;
  readonly selectionMode: ToggleGroupSelectionMode | undefined;
  readonly selectedValues: Set<string>;
  readonly onToggle: (value: string) => void;
  readonly register: (id: string, entry: ToggleGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly isActive: (id: string) => boolean;
  readonly setActive: (id: string) => void;
  readonly exists: boolean;
}

const TOGGLE_GROUP_CONTEXT_KEY = Symbol("shizen:toggle-group");

export function setToggleGroupContext(value: ToggleGroupContextValue): void {
  setContext(TOGGLE_GROUP_CONTEXT_KEY, value);
}

export function useToggleGroupContext(): ToggleGroupContextResult {
  const context = getContext<ToggleGroupContextValue | undefined>(TOGGLE_GROUP_CONTEXT_KEY);

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
        return undefined;
      },
      get selectedValues() {
        return new Set<string>();
      },
      get onToggle() {
        return () => {};
      },
      get register() {
        return (_id: string, _entry: ToggleGroupRegistration) => {};
      },
      get unregister() {
        return (_id: string) => {};
      },
      get isActive() {
        return (_id: string) => false;
      },
      get setActive() {
        return (_id: string) => {};
      },
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
