import { createContext } from "svelte";
import type { RadioGroupOrientation } from "./radio-group.types.js";

export interface RadioGroupRegistration {
  getRef: () => HTMLInputElement | null;
  getDisabled: () => boolean;
}

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly name: string | undefined;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioGroupOrientation;
  readonly setValue: (value: string) => void;
  readonly register: (id: string, entry: RadioGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly focusFirstEnabled: () => void;
  readonly focusLastEnabled: () => void;
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
      setValue(_value: string) {},
      register(_id: string, _entry: RadioGroupRegistration) {},
      unregister(_id: string) {},
      focusFirstEnabled() {},
      focusLastEnabled() {},
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
    setValue(value: string) {
      return context.setValue(value);
    },
    register(id: string, entry: RadioGroupRegistration) {
      return context.register(id, entry);
    },
    unregister(id: string) {
      return context.unregister(id);
    },
    focusFirstEnabled() {
      return context.focusFirstEnabled();
    },
    focusLastEnabled() {
      return context.focusLastEnabled();
    },
    get exists() {
      return true;
    }
  } satisfies RadioGroupContextResult;
}
