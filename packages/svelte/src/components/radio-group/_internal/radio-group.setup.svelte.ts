import { setRadioGroupContext } from "./radio-group.context.js";
import type { RadioGroupContextValue, RadioGroupRegistration } from "./radio-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import { createIdRegistry } from "../../../lib/runes/index.js";
import type { RadioGroupState } from "./radio-group.state.svelte.js";

export function setupRadioGroupContexts(state: RadioGroupState): void {
  const itemsInstanceIds = createIdRegistry();
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();
  const errorIds = createIdRegistry();

  setRadioGroupContext({
    get value() {
      return state.finalValue;
    },
    get hasSelection() {
      return state.hasSelection;
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
    get required() {
      return state.finalRequired;
    },
    get orientation() {
      return state.finalOrientation;
    },
    get variant() {
      return state.finalVariant;
    },
    get labelId() {
      return `${state.id}-label`;
    },
    get descriptionId() {
      return `${state.id}-description`;
    },
    get errorId() {
      return `${state.id}-error`;
    },
    get hasItems() {
      return itemsInstanceIds.size > 0;
    },
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    },
    get hasError() {
      return errorIds.size > 0;
    },
    setSubmissionInvalid(next: boolean) {
      state.setSubmissionInvalid(next);
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
    isActive(id: string) {
      return state.isActive(id);
    },
    setActiveId(id: string | undefined) {
      state.setActiveId(id);
    },
    getValueForId(id: string) {
      return state.getValueForId(id);
    },
    registerItems: itemsInstanceIds.register,
    unregisterItems: itemsInstanceIds.unregister
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
    get errorId() {
      return `${state.id}-error`;
    },
    get keepDescription() {
      return false;
    }
  });

  setContentSlotContext({
    registerLabel: labelIds.register,
    unregisterLabel: labelIds.unregister,
    registerDescription: descriptionIds.register,
    unregisterDescription: descriptionIds.unregister,
    registerError: errorIds.register,
    unregisterError: errorIds.unregister
  });
}
