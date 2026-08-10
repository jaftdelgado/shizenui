import { SubmissionInvalidState, warnIf } from "../../../lib/runes/index.js";
import type { SwitchGroupStateInstance } from "./switch-group.state.svelte.js";

export function focusFirstSwitch(container: HTMLElement | null): void {
  container?.querySelector<HTMLButtonElement>('[role="switch"]:not([data-disabled])')?.focus();
}

export function setupSwitchGroupForm(options: {
  state: SwitchGroupStateInstance;
  getRef: () => HTMLDivElement | null;
}): SubmissionInvalidState {
  const { state, getRef } = options;

  warnIf(
    () => !!getRef() && !state.finalName && !state.finalRequired && !!getRef()?.closest("form"),
    "SwitchGroup",
    "This switch group is inside a <form> but no `name` was provided — it will not participate in native form submission."
  );

  warnIf(
    () => !!getRef() && !state.finalName && state.finalRequired && !!getRef()?.closest("form"),
    "SwitchGroup",
    "This switch group is `required` inside a <form> but no `name` was provided — it will block native form submission until at least one switch is enabled, but its value will not be included in the submitted FormData. Pass `name` if you also need its values submitted."
  );

  return new SubmissionInvalidState(() => state.hasSelection);
}
