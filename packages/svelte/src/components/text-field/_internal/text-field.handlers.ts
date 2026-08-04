import type { SubmissionInvalidState } from "../../../lib/runes/index.js";

export type TextFieldControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface ValidityReporter {
  reportValidity(valid: boolean): void;
  reportInvalid(): void;
}

export interface TextFieldControlHandlers<T extends TextFieldControlElement> {
  handleInput(event: InputEvent & { currentTarget: T }): void;
  handleInvalid(event: Event & { currentTarget: T }): void;
}

export function createTextFieldControlHandlers<T extends TextFieldControlElement>(options: {
  reporters: ValidityReporter[];
  submissionInvalid?: SubmissionInvalidState;
  getOnInput: () => ((event: InputEvent & { currentTarget: T }) => void) | undefined;
  getOnInvalid: () => ((event: Event & { currentTarget: T }) => void) | undefined;
}) {
  const { reporters, submissionInvalid, getOnInput, getOnInvalid } = options;

  function handleInput(event: Event & { currentTarget: T }): void {
    const target = event.currentTarget as T & { validity: ValidityState };
    const valid = target.validity.valid;

    for (const reporter of reporters) reporter.reportValidity(valid);
    if (valid) submissionInvalid?.clear();

    getOnInput()?.(event as InputEvent & { currentTarget: T });
  }

  function handleInvalid(event: Event & { currentTarget: T }): void {
    for (const reporter of reporters) reporter.reportInvalid();
    submissionInvalid?.set(true);

    getOnInvalid()?.(event);
  }

  return { handleInput, handleInvalid } satisfies TextFieldControlHandlers<T>;
}
