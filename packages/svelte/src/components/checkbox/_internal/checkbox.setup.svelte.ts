import { setCheckboxContext } from "./checkbox.context.js";
import type { CheckboxContextValue } from "./checkbox.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import { createIdRegistry } from "../../../lib/runes/index.js";
import type { CheckboxState } from "./checkbox.state.svelte.js";

export function setupCheckboxContexts(state: CheckboxState): void {
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();
  const errorIds = createIdRegistry();

  setCheckboxContext({
    get checked() {
      return state.isChecked;
    },
    get indeterminate() {
      return state.isIndeterminate;
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
    get id() {
      return state.id;
    },
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    },
    get hasError() {
      return errorIds.size > 0;
    }
  } satisfies CheckboxContextValue);

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
      return errorIds.size > 0 ? `${state.id}-error` : undefined;
    },
    get keepDescription() {
      return true;
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
