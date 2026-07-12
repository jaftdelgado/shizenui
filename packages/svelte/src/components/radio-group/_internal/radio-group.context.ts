import { createContext } from "svelte";
import type { RadioGroupOrientation } from "./radio-group.types.js";

export interface RadioGroupRegistration {
  getDisabled: () => boolean;
  getValue: () => string;
}

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly hasSelection: boolean;
  readonly name: string | undefined;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioGroupOrientation;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
  readonly hasItems: boolean;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  readonly setValue: (value: string) => void;
  readonly register: (id: string, entry: RadioGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly isActive: (id: string) => boolean;
  readonly setActiveId: (id: string | undefined) => void;
  readonly getValueForId: (id: string) => string | undefined;
  readonly registerItems: (id: string) => void;
  readonly unregisterItems: (id: string) => void;
}

export interface RadioGroupContextResult extends RadioGroupContextValue {
  readonly exists: boolean;
}

const [getRadioGroupContext, setRadioGroupContext] = createContext<RadioGroupContextValue>();

function tryGetRadioGroupContext(): RadioGroupContextValue | undefined {
  try {
    return getRadioGroupContext();
  } catch {
    return undefined;
  }
}

export { setRadioGroupContext };

export function useRadioGroupContext(): RadioGroupContextResult {
  const context = tryGetRadioGroupContext();

  if (!context) {
    return {
      get value() {
        return undefined;
      },
      get hasSelection() {
        return false;
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
      get orientation() {
        return "vertical" as RadioGroupOrientation;
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
      get hasItems() {
        return false;
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
      setValue(_value: string) {},
      register(_id: string, _entry: RadioGroupRegistration) {},
      unregister(_id: string) {},
      isActive(_id: string) {
        return false;
      },
      setActiveId(_id: string | undefined) {},
      getValueForId(_id: string) {
        return undefined;
      },
      registerItems(_id: string) {},
      unregisterItems(_id: string) {},
      get exists() {
        return false;
      }
    } satisfies RadioGroupContextResult;
  }

  return {
    get value() {
      return context.value;
    },
    get hasSelection() {
      return context.hasSelection;
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
    get hasItems() {
      return context.hasItems;
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
    setValue(value: string) {
      return context.setValue(value);
    },
    register(id: string, entry: RadioGroupRegistration) {
      return context.register(id, entry);
    },
    unregister(id: string) {
      return context.unregister(id);
    },
    isActive(id: string) {
      return context.isActive(id);
    },
    setActiveId(id: string | undefined) {
      return context.setActiveId(id);
    },
    getValueForId(id: string) {
      return context.getValueForId(id);
    },
    registerItems(id: string) {
      return context.registerItems(id);
    },
    unregisterItems(id: string) {
      return context.unregisterItems(id);
    },
    get exists() {
      return true;
    }
  } satisfies RadioGroupContextResult;
}
