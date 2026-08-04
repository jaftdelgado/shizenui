import type { InputGroupStateInstance } from "./input-group.state.svelte.js";
import { setInputGroupContext, type InputGroupContextValue } from "./input-group.context.js";
import { createInputGroupControlRegistration } from "./input-group.registration.js";

export function setupInputGroupContexts(state: InputGroupStateInstance): void {
  let inputRef = $state<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const controlRegistration = createInputGroupControlRegistration({
    onControlChange(next) {
      inputRef = next;
    }
  });

  setInputGroupContext({
    get disabled() {
      return state.finalDisabled;
    },
    get readonly() {
      return state.finalReadonly;
    },
    get invalid() {
      return state.finalInvalid;
    },
    get required() {
      return state.finalRequired;
    },
    get variant() {
      return state.finalVariant;
    },
    get size() {
      return state.finalSize;
    },
    get id() {
      return state.id;
    },
    get inputId() {
      return state.inputId;
    },
    get inputRef() {
      return inputRef;
    },
    registerControl(ownerId: string, next: HTMLInputElement | HTMLTextAreaElement | null) {
      controlRegistration.register(ownerId, next);
    },
    unregisterControl(ownerId: string) {
      controlRegistration.unregister(ownerId);
    },
    reportInvalid() {
      state.reportInvalid();
    },
    reportValidity(valid: boolean) {
      state.reportValidity(valid);
    }
  } satisfies InputGroupContextValue);
}
