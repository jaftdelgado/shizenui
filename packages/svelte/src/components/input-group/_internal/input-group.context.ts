import { createContext } from "svelte";
import type { InputGroupKind, InputGroupSize, InputGroupVariant } from "./input-group.types.js";

export interface InputGroupContextValue {
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly variant: InputGroupVariant;
  readonly size: InputGroupSize;
  readonly kind: InputGroupKind | null;
  readonly id: string | undefined;
  setKind(kind: InputGroupKind | null): void;
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
      get kind() {
        return null;
      },
      get id() {
        return undefined;
      },
      setKind() {},
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
    get kind() {
      return context.kind;
    },
    get id() {
      return context.id;
    },
    setKind(kind) {
      context.setKind(kind);
    },
    get exists() {
      return true;
    }
  } satisfies InputGroupContextResult;
}
