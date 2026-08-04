import { SubmissionInvalidState } from "../../../lib/runes/index.js";
import type {
  TextFieldContextResult,
  TextFieldControl
} from "../../text-field/_internal/text-field.context.js";
import {
  syncNativeValidity,
  type NativeValidityConstraints,
  type NativeValidityReporter
} from "../../text-field/_internal/text-field.validity.svelte.js";
import type { InputGroupStateInstance } from "./input-group.state.svelte.js";
import type { InputGroupContextResult } from "./input-group.context.js";

export function setupInputGroupSubmissionInvalid(
  state: InputGroupStateInstance
): SubmissionInvalidState {
  return new SubmissionInvalidState(() => state.isNativeValid);
}

export function syncInputGroupControlValidity(options: {
  getRef: () => TextFieldControl | null;
  getValue: () => string;
  getConstraints: () => NativeValidityConstraints;
  inputGroupContext: InputGroupContextResult;
  textFieldContext: TextFieldContextResult;
}): void {
  const reporters: NativeValidityReporter[] = [options.inputGroupContext, options.textFieldContext];

  syncNativeValidity({
    getRef: options.getRef,
    getValue: options.getValue,
    getConstraints: options.getConstraints,
    reporters
  });
}
