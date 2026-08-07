import { SubmissionInvalidState, warnIf } from "../../../lib/runes/index.js";
import type { RadioGroupStateInstance } from "./radio-group.state.svelte.js";

export function focusFirstRadio(options: {
  container: HTMLElement | null;
  setActiveId: (id: string | undefined) => void;
}): void {
  const target = options.container?.querySelector<HTMLButtonElement>(
    '[role="radio"]:not([data-disabled])'
  );

  if (!target) return;

  options.setActiveId(target.id);
  target.focus();
}

export function setupRadioGroupForm(options: {
  state: RadioGroupStateInstance;
  getRef: () => HTMLDivElement | null;
}): SubmissionInvalidState {
  const { state, getRef } = options;

  warnIf(
    () => !!getRef() && !state.finalName && !state.finalRequired && !!getRef()?.closest("form"),
    "RadioGroup",
    "This radio group is inside a <form> but no `name` was provided — it will not participate in native form submission."
  );

  warnIf(
    () => !!getRef() && !state.finalName && state.finalRequired && !!getRef()?.closest("form"),
    "RadioGroup",
    "This radio group is `required` inside a <form> but no `name` was provided — it will block native form submission until an option is selected, but its value will not be included in the submitted FormData. Pass `name` if you also need its value submitted."
  );

  return new SubmissionInvalidState(() => state.hasSelection);
}
