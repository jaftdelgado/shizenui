import { SubmissionInvalidState } from "../../../lib/runes/index.js";
import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";
import {
  syncNativeValidity,
  type NativeValidityConstraints,
  type NativeValidityReporter
} from "../../text-field/_internal/text-field.validity.svelte.js";
import type { TextAreaStateInstance } from "./text-area.state.svelte.js";

export function setupTextAreaForm(options: {
  textAreaState: TextAreaStateInstance;
  textFieldContext: TextFieldContextResult;
  getRef: () => HTMLTextAreaElement | null;
  getValue: () => string;
  getConstraints: () => NativeValidityConstraints;
}): SubmissionInvalidState {
  const submissionInvalid = new SubmissionInvalidState(() => options.textAreaState.isNativeValid);

  const reporters: NativeValidityReporter[] = [options.textAreaState, options.textFieldContext];
  syncNativeValidity({
    getRef: options.getRef,
    getValue: options.getValue,
    getConstraints: options.getConstraints,
    reporters
  });

  return submissionInvalid;
}
