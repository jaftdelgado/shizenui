import { SubmissionInvalidState } from "../../../lib/runes/index.js";
import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";
import {
  syncNativeValidity,
  type NativeValidityConstraints,
  type NativeValidityReporter
} from "../../text-field/_internal/text-field.validity.svelte.js";
import type { InputStateInstance } from "./input.state.svelte.js";

export function setupInputForm(options: {
  inputState: InputStateInstance;
  textFieldContext: TextFieldContextResult;
  getRef: () => HTMLInputElement | null;
  getValue: () => string;
  getConstraints: () => NativeValidityConstraints;
}): SubmissionInvalidState {
  const submissionInvalid = new SubmissionInvalidState(() => options.inputState.isNativeValid);

  const reporters: NativeValidityReporter[] = [options.inputState, options.textFieldContext];
  syncNativeValidity({
    getRef: options.getRef,
    getValue: options.getValue,
    getConstraints: options.getConstraints,
    reporters
  });

  return submissionInvalid;
}
