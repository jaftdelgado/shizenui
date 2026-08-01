import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import {
  setTextFieldContext,
  type TextFieldContextValue,
  type TextFieldControl
} from "./text-field.context.js";
import type { TextFieldStateInstance } from "./text-field.state.svelte.js";

export function setupTextFieldContexts(state: TextFieldStateInstance): void {
  let control = $state<TextFieldControl | null>(null);
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());
  let errorIds = $state(new Set<string>());

  setTextFieldContext({
    get control() {
      return control;
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
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    },
    get hasError() {
      return errorIds.size > 0;
    },
    setControl(next: TextFieldControl | null) {
      control = next;
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
    registerLabel(id: string) {
      if (labelIds.has(id)) return;
      const next = new Set(labelIds);
      next.add(id);
      labelIds = next;
    },
    unregisterLabel(id: string) {
      if (!labelIds.has(id)) return;
      const next = new Set(labelIds);
      next.delete(id);
      labelIds = next;
    },
    registerDescription(id: string) {
      if (descriptionIds.has(id)) return;
      const next = new Set(descriptionIds);
      next.add(id);
      descriptionIds = next;
    },
    unregisterDescription(id: string) {
      if (!descriptionIds.has(id)) return;
      const next = new Set(descriptionIds);
      next.delete(id);
      descriptionIds = next;
    },
    registerError(id: string) {
      if (errorIds.has(id)) return;
      const next = new Set(errorIds);
      next.add(id);
      errorIds = next;
    },
    unregisterError(id: string) {
      if (!errorIds.has(id)) return;
      const next = new Set(errorIds);
      next.delete(id);
      errorIds = next;
    }
  });
}
