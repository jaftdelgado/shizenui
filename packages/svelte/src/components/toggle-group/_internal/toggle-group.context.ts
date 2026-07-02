import { getContext, setContext } from "svelte";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupSelectionMode } from "./toggle-group.types.js";

export interface ToggleGroupContextValue {
  readonly variant: ToggleVariant;
  readonly size: ToggleSize;
  readonly disabled: boolean;
  readonly selectionMode: ToggleGroupSelectionMode | undefined;
  readonly selectedValues: Set<string>;
  readonly onToggle: (value: string) => void;
}

export interface ToggleGroupContextResult {
  readonly variant: ToggleVariant;
  readonly size: ToggleSize;
  readonly disabled: boolean;
  readonly selectionMode: ToggleGroupSelectionMode | undefined;
  readonly selectedValues: Set<string>;
  readonly onToggle: (value: string) => void;
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
    get exists() {
      return true;
    }
  } satisfies ToggleGroupContextResult;
}
