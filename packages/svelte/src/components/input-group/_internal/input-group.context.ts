import { createContext } from "svelte";
import type { InputGroupSize, InputGroupVariant } from "./input-group.types.js";

export interface InputGroupContextValue {
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly variant: InputGroupVariant;
  readonly size: InputGroupSize;
  readonly id: string | undefined;
  readonly inputId: string | undefined;
  readonly inputRef: HTMLInputElement | HTMLTextAreaElement | null;
  registerControl(ownerId: string, el: HTMLInputElement | HTMLTextAreaElement | null): void;
  unregisterControl(ownerId: string): void;
  reportInvalid(): void;
  reportValidity(valid: boolean): void;
}

export interface InputGroupContextResult extends InputGroupContextValue {
  readonly exists: boolean;
}

const [getInputGroupContext, setInputGroupContext] = createContext<InputGroupContextValue>();

function tryGetInputGroupContext(): InputGroupContextValue | undefined {
  try {
    return getInputGroupContext();
  } catch {
    return undefined;
  }
}

export { setInputGroupContext };

export function useInputGroupContext(): InputGroupContextResult {
  const context = tryGetInputGroupContext();

  if (!context) {
    return {
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
      get variant(): InputGroupVariant {
        return "default";
      },
      get size(): InputGroupSize {
        return "md";
      },
      get id() {
        return undefined;
      },
      get inputId() {
        return undefined;
      },
      get inputRef() {
        return null;
      },
      registerControl() {},
      unregisterControl() {},
      reportInvalid() {},
      reportValidity(_valid: boolean) {},
      get exists() {
        return false;
      }
    } satisfies InputGroupContextResult;
  }

  return {
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
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get id() {
      return context.id;
    },
    get inputId() {
      return context.inputId;
    },
    get inputRef() {
      return context.inputRef;
    },
    registerControl(ownerId, el) {
      context.registerControl(ownerId, el);
    },
    unregisterControl(ownerId) {
      context.unregisterControl(ownerId);
    },
    reportInvalid() {
      context.reportInvalid();
    },
    reportValidity(valid) {
      context.reportValidity(valid);
    },
    get exists() {
      return true;
    }
  } satisfies InputGroupContextResult;
}
