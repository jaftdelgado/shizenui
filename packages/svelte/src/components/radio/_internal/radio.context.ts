import { createContext } from "svelte";

export interface RadioContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
}

export interface RadioContextResult {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
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
    get exists() {
      return true;
    }
  } satisfies RadioContextResult;
}
