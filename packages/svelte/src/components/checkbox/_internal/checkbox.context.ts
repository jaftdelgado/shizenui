import { createContext } from "svelte";

export interface CheckboxContextValue {
  readonly checked: boolean;
  readonly indeterminate: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly id: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
}

export interface CheckboxContextResult {
  readonly checked: boolean;
  readonly indeterminate: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly id: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  readonly exists: boolean;
}

const [getCheckboxContext, setCheckboxContext] = createContext<CheckboxContextValue>();

function tryGetCheckboxContext(): CheckboxContextValue | undefined {
  try {
    return getCheckboxContext();
  } catch {
    return undefined;
  }
}

export { setCheckboxContext };

export function useCheckboxContext(): CheckboxContextResult {
  const context = tryGetCheckboxContext();

  if (!context) {
    return {
      get checked() {
        return false;
      },
      get indeterminate() {
        return false;
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
      get id() {
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
      get exists() {
        return false;
      }
    } satisfies CheckboxContextResult;
  }

  return {
    get checked() {
      return context.checked;
    },
    get indeterminate() {
      return context.indeterminate;
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
    get id() {
      return context.id;
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
    get exists() {
      return true;
    }
  } satisfies CheckboxContextResult;
}
