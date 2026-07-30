import { SubmissionInvalidState } from "../../../lib/runes/index.js";
import type { TextFieldStateInstance } from "./text-field.state.svelte.js";

export function setupTextFieldSubmissionInvalid(
  state: TextFieldStateInstance
): SubmissionInvalidState {
  return new SubmissionInvalidState(() => state.isNativeValid);
}
