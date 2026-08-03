import { SubmissionInvalidState } from "../../../lib/runes/index.js";
import type { InputGroupStateInstance } from "./input-group.state.svelte.js";

export function setupInputGroupSubmissionInvalid(
  state: InputGroupStateInstance
): SubmissionInvalidState {
  return new SubmissionInvalidState(() => state.isNativeValid);
}
