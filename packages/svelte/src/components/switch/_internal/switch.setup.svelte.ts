import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { createIdRegistry } from "../../../lib/runes/index.js";
import { setSwitchContext } from "./switch.context.js";
import type { SwitchContextValue } from "./switch.context.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();
  const errorIds = createIdRegistry();

  setSwitchContext({
    get checked() {
      return state.finalChecked;
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
      return props.id();
    },
    get size() {
      return state.finalSize;
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
  } satisfies SwitchContextValue);

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
      return props.id();
    },
    get inputId() {
      return props.id();
    },
    get labelId() {
      return `${props.id()}-label`;
    },
    get descriptionId() {
      return `${props.id()}-description`;
    },
    get errorId() {
      return errorIds.size > 0 ? `${props.id()}-error` : undefined;
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
