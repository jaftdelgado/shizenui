import { SubmissionInvalidState, warnIf } from "../../../lib/runes/index.js";
import type { CheckboxStateInstance } from "./checkbox.state.svelte.js";

export function setupCheckboxFormWarnings(options: {
  state: CheckboxStateInstance;
  getRef: () => HTMLButtonElement | null;
}): SubmissionInvalidState {
  const { state, getRef } = options;

  warnIf(
    () => !!getRef() && !state.name && !state.finalRequired && !!getRef()?.closest("form"),
    "Checkbox",
    "This checkbox is inside a <form> but no `name` was provided — it will not participate in native form submission."
  );

  warnIf(
    () => !!getRef() && !state.name && state.finalRequired && !!getRef()?.closest("form"),
    "Checkbox",
    "This checkbox is `required` inside a <form> but no `name` was provided — it will block native form submission until checked, but its value will not be included in the submitted FormData. Pass `name` if you also need its value submitted."
  );

  return new SubmissionInvalidState(() => state.isChecked);
}
