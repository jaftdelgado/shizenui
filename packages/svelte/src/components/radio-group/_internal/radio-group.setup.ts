import { setRadioGroupContext } from "./radio-group.context.js";
import type { RadioGroupContextValue, RadioGroupRegistration } from "./radio-group.context.js";
import { setFieldStateContext } from "../../../lib/index.js";
import type { RadioGroupState } from "./radio-group.state.svelte.js";

export function setupRadioGroupContexts(state: RadioGroupState): void {
  setRadioGroupContext({
    get value() {
      return state.finalValue;
    },
    get name() {
      return state.finalName;
    },
    get disabled() {
      return state.finalDisabled;
    },
    get readonly() {
      return state.finalReadonly;
    },
    get invalid() {
      return state.finalInvalid;
    },
    get orientation() {
      return state.finalOrientation;
    },
    setValue(value: string) {
      state.setValue(value);
    },
    register(id: string, entry: RadioGroupRegistration) {
      state.register(id, entry);
    },
    unregister(id: string) {
      state.unregister(id);
    },
    focusFirstEnabled() {
      state.focusFirstEnabled();
    },
    focusLastEnabled() {
      state.focusLastEnabled();
    }
  } satisfies RadioGroupContextValue);

  setFieldStateContext({
    get invalid() {
      return state.finalInvalid;
    },
    get disabled() {
      return state.finalDisabled;
    },
    get readonly() {
      return state.finalReadonly;
    },
    get required() {
      return state.finalRequired;
    },
    get id() {
      return state.id;
    },
    get labelId() {
      return `${state.id}-label`;
    },
    get descriptionId() {
      return `${state.id}-description`;
    },
    get keepDescription() {
      return false;
    }
  });
}
