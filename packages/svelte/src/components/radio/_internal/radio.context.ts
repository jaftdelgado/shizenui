import { getContext, setContext } from "svelte";

export interface RadioContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface RadioContextResult {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
  readonly exists: boolean;
}

const RADIO_CONTEXT_KEY = Symbol("shizen:radio");

export function setRadioContext(value: RadioContextValue): void {
  setContext(RADIO_CONTEXT_KEY, value);
}

export function useRadioContext(): RadioContextResult {
  const context = getContext<RadioContextValue | undefined>(RADIO_CONTEXT_KEY);

  if (!context) {
    return {
      get checked() {
        return false;
      },
      get disabled() {
        return false;
      },
      get invalid() {
        return false;
      },
      get id() {
        return "";
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
