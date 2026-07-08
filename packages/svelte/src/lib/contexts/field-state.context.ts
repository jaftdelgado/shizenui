import { createContext } from "svelte";

export interface FieldStateContextValue {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean;
  readonly keepDescription?: boolean;
  readonly id: string | undefined;
  readonly inputId?: string;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
}

export interface FieldStateContextResult {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean;
  readonly keepDescription: boolean;
  readonly id: string | undefined;
  readonly inputId: string | undefined;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
  readonly exists: boolean;
}

const [getFieldStateContext, setFieldStateContext] = createContext<FieldStateContextValue>();

function tryGetFieldStateContext(): FieldStateContextValue | undefined {
  try {
    return getFieldStateContext();
  } catch {
    return undefined;
  }
}

export { setFieldStateContext };

export function useFieldStateContext(): FieldStateContextResult {
  const context = tryGetFieldStateContext();

  if (!context) {
    return {
      get invalid() {
        return false;
      },
      get disabled() {
        return false;
      },
      get readonly() {
        return false;
      },
      get required() {
        return false;
      },
      get keepDescription() {
        return false;
      },
      get id() {
        return undefined;
      },
      get inputId() {
        return undefined;
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
    get readonly() {
      return context.readonly;
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
    get inputId() {
      return context.inputId;
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
    get exists() {
      return true;
    }
  } satisfies FieldStateContextResult;
}
