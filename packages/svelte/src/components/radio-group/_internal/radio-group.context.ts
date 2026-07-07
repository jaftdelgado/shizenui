import { getContext, setContext } from "svelte";

export type RadioOrientation = "horizontal" | "vertical";

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioOrientation;
  readonly setValue: (value: string) => void;
}

export interface RadioGroupContextResult extends RadioGroupContextValue {
  readonly exists: boolean;
}

const RADIO_GROUP_CONTEXT_KEY = Symbol("shizen:radio-group");

export function setRadioGroupContext(value: RadioGroupContextValue): void {
  setContext(RADIO_GROUP_CONTEXT_KEY, value);
}

export function useRadioGroupContext(): RadioGroupContextResult {
  const context = getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      value: undefined,
      name: "",
      disabled: false,
      invalid: false,
      orientation: "vertical",
      setValue: (_: string) => {},
      exists: false
    } satisfies RadioGroupContextResult;
  }

  return {
    get value() {
      return context.value;
    },
    get name() {
      return context.name;
    },
    get disabled() {
      return context.disabled;
    },
    get invalid() {
      return context.invalid;
    },
    get orientation() {
      return context.orientation;
    },
    setValue: context.setValue,
    exists: true
  } satisfies RadioGroupContextResult;
}
