import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { createIdRegistry, warnIf } from "../../../lib/runes/index.js";
import {
  setTextFieldContext,
  type TextFieldContextValue,
  type TextFieldControl
} from "./text-field.context.js";
import { createTextFieldControlRegistration } from "./text-field.registration.js";
import type { TextFieldStateInstance } from "./text-field.state.svelte.js";

export function setupTextFieldContexts(state: TextFieldStateInstance): void {
  let control = $state<TextFieldControl | null>(null);
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();
  const errorIds = createIdRegistry();
  let hasAccessibleName = $state(false);
  let hasMultipleControls = $state(false);

  const controlRegistration = createTextFieldControlRegistration({
    onControlChange(next) {
      control = next;
    },
    onAccessibleNameChange(next) {
      hasAccessibleName = next;
    },
    onMultipleControl() {
      hasMultipleControls = true;
    }
  });

  warnIf(
    () => hasMultipleControls,
    "TextField",
    "Multiple native controls were registered. Only one <Input>, <TextArea>, or <InputGroup> control should be used inside a <TextField>."
  );

  setTextFieldContext({
    get control() {
      return control;
    },
    get hasAccessibleName() {
      return hasAccessibleName;
    },
    get value() {
      return state.value;
    },
    get size() {
      return state.finalSize;
    },
    get variant() {
      return state.finalVariant;
    },
    get rawDisabled() {
      return state.rawDisabled;
    },
    get rawInvalid() {
      return state.rawInvalid;
    },
    get rawReadonly() {
      return state.rawReadonly;
    },
    get rawRequired() {
      return state.rawRequired;
    },
    get rawSize() {
      return state.rawSize;
    },
    get rawVariant() {
      return state.rawVariant;
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
    registerControl(ownerId: string, next: TextFieldControl | null) {
      controlRegistration.register(ownerId, next);
    },
    unregisterControl(ownerId: string) {
      controlRegistration.unregister(ownerId);
    },
    setValue(value: string) {
      state.setValue(value);
    },
    reportInvalid() {
      state.reportInvalid();
    },
    reportValidity(valid: boolean) {
      state.reportValidity(valid);
    }
  } satisfies TextFieldContextValue);

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
    get inputId() {
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
