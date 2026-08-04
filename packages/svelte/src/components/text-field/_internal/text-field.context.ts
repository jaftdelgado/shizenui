import { createContext } from "svelte";
import type { TextFieldSize, TextFieldVariant } from "./text-field.types.js";

export type TextFieldControl = HTMLInputElement | HTMLTextAreaElement;

export interface TextFieldContextValue {
  readonly control: TextFieldControl | null;
  readonly hasAccessibleName: boolean;
  readonly value: string;
  readonly size: TextFieldSize;
  readonly variant: TextFieldVariant;
  readonly rawDisabled: boolean | undefined;
  readonly rawInvalid: boolean | undefined;
  readonly rawReadonly: boolean | undefined;
  readonly rawRequired: boolean | undefined;
  readonly rawSize: TextFieldSize | undefined;
  readonly rawVariant: TextFieldVariant | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  registerControl(ownerId: string, control: TextFieldControl | null): void;
  unregisterControl(ownerId: string): void;
  setValue(value: string): void;
  reportInvalid(): void;
  reportValidity(valid: boolean): void;
}

export interface TextFieldContextResult extends TextFieldContextValue {
  readonly exists: boolean;
}

const [getTextFieldContext, setTextFieldContext] = createContext<TextFieldContextValue>();

function tryGetTextFieldContext(): TextFieldContextValue | undefined {
  try {
    return getTextFieldContext();
  } catch {
    return undefined;
  }
}

export { setTextFieldContext };

export function useTextFieldContext(): TextFieldContextResult {
  const context = tryGetTextFieldContext();

  if (!context) {
    return {
      get control() {
        return null;
      },
      get hasAccessibleName() {
        return false;
      },
      get value() {
        return "";
      },
      get size(): TextFieldSize {
        return "md";
      },
      get variant(): TextFieldVariant {
        return "default";
      },
      get rawDisabled() {
        return undefined;
      },
      get rawInvalid() {
        return undefined;
      },
      get rawReadonly() {
        return undefined;
      },
      get rawRequired() {
        return undefined;
      },
      get rawSize() {
        return undefined;
      },
      get rawVariant() {
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
      registerControl(_ownerId: string, _control: TextFieldControl | null) {},
      unregisterControl(_ownerId: string) {},
      setValue(_value: string) {},
      reportInvalid() {},
      reportValidity(_valid: boolean) {},
      get exists() {
        return false;
      }
    } satisfies TextFieldContextResult;
  }

  return {
    get control() {
      return context.control;
    },
    get hasAccessibleName() {
      return context.hasAccessibleName;
    },
    get value() {
      return context.value;
    },
    get size() {
      return context.size;
    },
    get variant() {
      return context.variant;
    },
    get rawDisabled() {
      return context.rawDisabled;
    },
    get rawInvalid() {
      return context.rawInvalid;
    },
    get rawReadonly() {
      return context.rawReadonly;
    },
    get rawRequired() {
      return context.rawRequired;
    },
    get rawSize() {
      return context.rawSize;
    },
    get rawVariant() {
      return context.rawVariant;
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
    registerControl(ownerId: string, control: TextFieldControl | null) {
      context.registerControl(ownerId, control);
    },
    unregisterControl(ownerId: string) {
      context.unregisterControl(ownerId);
    },
    setValue(value: string) {
      context.setValue(value);
    },
    reportInvalid() {
      context.reportInvalid();
    },
    reportValidity(valid: boolean) {
      context.reportValidity(valid);
    },
    get exists() {
      return true;
    }
  } satisfies TextFieldContextResult;
}
