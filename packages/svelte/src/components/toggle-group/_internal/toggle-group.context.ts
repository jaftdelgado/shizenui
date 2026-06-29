import { getContext, setContext } from "svelte";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";

export interface ToggleGroupContextValue {
  readonly variant: ToggleVariant;
  readonly size: ToggleSize;
  readonly disabled: boolean;
}

export interface ToggleGroupContextResult {
  readonly variant: ToggleVariant;
  readonly size: ToggleSize;
  readonly disabled: boolean;
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
    get exists() {
      return true;
    }
  } satisfies ToggleGroupContextResult;
}
