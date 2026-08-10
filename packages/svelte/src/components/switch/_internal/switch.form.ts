import { SubmissionInvalidState, warnIf } from "../../../lib/runes/index.js";
import type { SwitchStateInstance } from "./switch.state.svelte.js";

export function setupSwitchForm(options: {
  state: SwitchStateInstance;
  getRef: () => HTMLButtonElement | null;
}): SubmissionInvalidState {
  const { state, getRef } = options;

  warnIf(
    () => !!getRef() && !state.finalName && !state.finalRequired && !!getRef()?.closest("form"),
    "Switch",
    "This switch is inside a <form> but no `name` was provided — it will not participate in native form submission."
  );

  warnIf(
    () => !!getRef() && !state.finalName && state.finalRequired && !!getRef()?.closest("form"),
    "Switch",
    "This switch is `required` inside a <form> but no `name` was provided — it will block native form submission when unchecked, but its value will not be included in the submitted FormData. Pass `name` if you also need its value submitted."
  );

  return new SubmissionInvalidState(() => state.finalChecked);
}
