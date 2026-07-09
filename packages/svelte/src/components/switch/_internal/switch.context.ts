import { createContext } from "svelte";
import type { SwitchSize } from "./switch.types.js";

export interface SwitchContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly id: string | undefined;
  readonly size: SwitchSize;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
}

export interface SwitchContextResult {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly id: string | undefined;
  readonly size: SwitchSize;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly exists: boolean;
}

const [getSwitchContext, setSwitchContext] = createContext<SwitchContextValue>();

function tryGetSwitchContext(): SwitchContextValue | undefined {
  try {
    return getSwitchContext();
  } catch {
    return undefined;
  }
}

export { setSwitchContext };

export function useSwitchContext(): SwitchContextResult {
  const context = tryGetSwitchContext();

  if (!context) {
    return {
      get checked() {
        return false;
      },
      get disabled() {
        return false;
      },
      get readonly() {
        return false;
      },
      get id() {
        return undefined;
      },
      get size() {
        return "md" as SwitchSize;
      },
      get hasLabel() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      get exists() {
        return false;
      }
    } satisfies SwitchContextResult;
  }

  return {
    get checked() {
      return context.checked;
    },
    get disabled() {
      return context.disabled;
    },
    get readonly() {
      return context.readonly;
    },
    get id() {
      return context.id;
    },
    get size() {
      return context.size;
    },
    get hasLabel() {
      return context.hasLabel;
    },
    get hasDescription() {
      return context.hasDescription;
    },
    get exists() {
      return true;
    }
  } satisfies SwitchContextResult;
}
