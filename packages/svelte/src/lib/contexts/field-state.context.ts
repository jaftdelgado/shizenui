import { getContext, setContext } from "svelte";

export interface FieldStateContextValue {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly keepDescription?: boolean;
  readonly id: string;
}

export interface FieldStateContextResult {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly keepDescription: boolean;
  readonly id: string;
  readonly exists: boolean;
}

const FIELD_STATE_CONTEXT_KEY = Symbol("shizen:field-state");

export function setFieldStateContext(value: FieldStateContextValue): void {
  setContext(FIELD_STATE_CONTEXT_KEY, value);
}

export function useFieldStateContext(): FieldStateContextResult {
  const context = getContext<FieldStateContextValue | undefined>(FIELD_STATE_CONTEXT_KEY);

  if (!context) {
    return {
      get invalid() {
        return false;
      },
      get disabled() {
        return false;
      },
      get required() {
        return false;
      },
      get keepDescription() {
        return false;
      },
      get id() {
        return "";
      },
      get exists() {
        return false;
      }
    } satisfies FieldStateContextResult;
  }

  return {
    get invalid() {
      return context.invalid;
    },
    get disabled() {
      return context.disabled;
    },
    get required() {
      return context.required;
    },
    get keepDescription() {
      return context.keepDescription ?? false;
    },
    get id() {
      return context.id;
    },
    get exists() {
      return true;
    }
  } satisfies FieldStateContextResult;
}
