import { createContext } from "svelte";
import type { TextFieldSize, TextFieldVariant } from "./text-field.types.js";

export type TextFieldControl = HTMLInputElement | HTMLTextAreaElement;

export interface TextFieldContextValue {
  readonly control: TextFieldControl | null;
  readonly value: string;
  readonly size: TextFieldSize;
  readonly variant: TextFieldVariant;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  setControl(control: TextFieldControl | null): void;
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
      get value() {
        return "";
      },
      get size(): TextFieldSize {
        return "md";
      },
      get variant(): TextFieldVariant {
        return "default";
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
      setControl(_control: TextFieldControl | null) {},
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
    get value() {
      return context.value;
    },
    get size() {
      return context.size;
    },
    get variant() {
      return context.variant;
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
    setControl(control: TextFieldControl | null) {
      context.setControl(control);
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
