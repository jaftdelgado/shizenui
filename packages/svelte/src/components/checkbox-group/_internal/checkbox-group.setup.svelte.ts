import { setCheckboxGroupContext } from "./checkbox-group.context.js";
import type { CheckboxGroupContextValue } from "./checkbox-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import { createIdRegistry } from "../../../lib/runes/index.js";
import type { CheckboxGroupState } from "./checkbox-group.state.svelte.js";

export function setupCheckboxGroupContexts(state: CheckboxGroupState): void {
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();
  const errorIds = createIdRegistry();

  setCheckboxGroupContext({
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
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    },
    get hasError() {
      return errorIds.size > 0;
    },
    isSelected(value: string) {
      return state.isSelected(value);
    },
    toggleValue(value: string) {
      return state.toggleValue(value);
    }
  } satisfies CheckboxGroupContextValue);

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
