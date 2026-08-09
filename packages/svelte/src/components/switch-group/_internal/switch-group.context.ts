import { createContext } from "svelte";
import type { SwitchSize } from "../../switch/_internal/switch.types.js";
import type { SwitchGroupOrientation } from "./switch-group.types.js";

export interface SwitchGroupContextValue {
  readonly value: string[];
  readonly name: string | undefined;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly size: SwitchSize;
  readonly orientation: SwitchGroupOrientation;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  readonly isSelected: (value: string) => boolean;
  readonly toggleValue: (value: string) => void;
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
      get value() {
        return [];
      },
      get name() {
        return undefined;
      },
      get disabled() {
        return false;
      },
      get readonly() {
        return false;
      },
      get invalid() {
        return false;
      },
      get required() {
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
      get errorId() {
        return undefined;
      },
      get hasLabel() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      get hasError() {
        return false;
      },
      isSelected(_value: string) {
        return false;
      },
      toggleValue(_value: string) {},
      get exists() {
        return false;
      }
    } satisfies SwitchGroupContextResult;
  }

  return {
    get value() {
      return context.value;
    },
    get name() {
      return context.name;
    },
    get disabled() {
      return context.disabled;
    },
    get readonly() {
      return context.readonly;
    },
    get invalid() {
      return context.invalid;
    },
    get required() {
      return context.required;
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
    get errorId() {
      return context.errorId;
    },
    get hasLabel() {
      return context.hasLabel;
    },
    get hasDescription() {
      return context.hasDescription;
    },
    get hasError() {
      return context.hasError;
    },
    isSelected(value: string) {
      return context.isSelected(value);
    },
    toggleValue(value: string) {
      return context.toggleValue(value);
    },
    get exists() {
      return true;
    }
  } satisfies SwitchGroupContextResult;
}
