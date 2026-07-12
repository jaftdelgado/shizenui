import { createContext } from "svelte";
import type { RadioGroupOrientation } from "./radio-group.types.js";

export interface RadioGroupRegistration {
  getRef: () => HTMLButtonElement | null;
  getDisabled: () => boolean;
  getValue: () => string;
}

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly name: string | undefined;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioGroupOrientation;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  readonly setValue: (value: string) => void;
  readonly register: (id: string, entry: RadioGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly isActive: (id: string) => boolean;
  readonly getValueForId: (id: string) => string | undefined;
  readonly setActiveId: (id: string | undefined) => void;
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
      getValueForId(_id: string) {
        return undefined;
      },
      setActiveId(_id: string | undefined) {},
      get exists() {
        return false;
      }
    } satisfies RadioGroupContextResult;
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
    getValueForId(id: string) {
      return context.getValueForId(id);
    },
    setActiveId(id: string | undefined) {
      return context.setActiveId(id);
    },
    get exists() {
      return true;
    }
  } satisfies RadioGroupContextResult;
}
