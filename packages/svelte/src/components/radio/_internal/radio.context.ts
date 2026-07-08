import { createContext } from "svelte";

export interface RadioContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
}

export interface RadioContextResult {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly exists: boolean;
}

const [getRadioContext, setRadioContext] = createContext<RadioContextValue>();

function tryGetRadioContext(): RadioContextValue | undefined {
  try {
    return getRadioContext();
  } catch {
    return undefined;
  }
}

export { setRadioContext };

export function useRadioContext(): RadioContextResult {
  const context = tryGetRadioContext();

  if (!context) {
    return {
      get checked() {
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
      get id() {
        return undefined;
      },
      get hasLabel() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      get exists() {
        return false;
      }
    } satisfies RadioContextResult;
  }

  return {
    get checked() {
      return context.checked;
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
    get id() {
      return context.id;
    },
    get hasLabel() {
      return context.hasLabel;
    },
    get hasDescription() {
      return context.hasDescription;
    },
    get exists() {
      return true;
    }
  } satisfies RadioContextResult;
}
