import { getContext, setContext } from "svelte";
import type { SwitchSize } from "../../switch/_internal";

export type SwitchGroupOrientation = "horizontal" | "vertical";

export interface SwitchGroupContextValue {
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly size: SwitchSize;
  readonly orientation: SwitchGroupOrientation;
}

export interface SwitchGroupContextResult {
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly size: SwitchSize;
  readonly orientation: SwitchGroupOrientation;
  readonly exists: boolean;
}

const SWITCH_GROUP_CONTEXT_KEY = Symbol("shizen:switch-group");

export function setSwitchGroupContext(value: SwitchGroupContextValue): void {
  setContext(SWITCH_GROUP_CONTEXT_KEY, value);
}

export function useSwitchGroupContext(): SwitchGroupContextResult {
  const context = getContext<SwitchGroupContextValue | undefined>(SWITCH_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      get disabled() {
        return false;
      },
      get readonly() {
        return false;
      },
      get size() {
        return "md" as SwitchSize;
      },
      get orientation() {
        return "vertical" as SwitchGroupOrientation;
      },
      get exists() {
        return false;
      }
    } satisfies SwitchGroupContextResult;
  }

  return {
    get disabled() {
      return context.disabled;
    },
    get readonly() {
      return context.readonly;
    },
    get size() {
      return context.size;
    },
    get orientation() {
      return context.orientation;
    },
    get exists() {
      return true;
    }
  } satisfies SwitchGroupContextResult;
}
