import { createContext } from "svelte";
import type { SwitchSize } from "../../switch/_internal/index.js";
import type { SwitchGroupOrientation } from "./switch-group.types.js";

export interface SwitchGroupContextValue {
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly size: SwitchSize;
  readonly orientation: SwitchGroupOrientation;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
}

export interface SwitchGroupContextResult extends SwitchGroupContextValue {
  readonly exists: boolean;
}

const [getSwitchGroupContext, setSwitchGroupContext] = createContext<SwitchGroupContextValue>();

function tryGetSwitchGroupContext(): SwitchGroupContextValue | undefined {
  try {
    return getSwitchGroupContext();
  } catch {
    return undefined;
  }
}

export { setSwitchGroupContext };

export function useSwitchGroupContext(): SwitchGroupContextResult {
  const context = tryGetSwitchGroupContext();

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
      get labelId() {
        return undefined;
      },
      get descriptionId() {
        return undefined;
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
    get labelId() {
      return context.labelId;
    },
    get descriptionId() {
      return context.descriptionId;
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
  } satisfies SwitchGroupContextResult;
}
