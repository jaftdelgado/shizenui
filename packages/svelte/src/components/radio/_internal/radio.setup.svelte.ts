import { setRadioContext } from "./radio.context.js";
import type { RadioContextValue } from "./radio.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import { createIdRegistry } from "../../../lib/runes/index.js";
import type { RadioState } from "./radio.state.svelte.js";

export function setupRadioContexts(state: RadioState): void {
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();

  setRadioContext({
    get checked() {
      return state.isChecked;
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
    get id() {
      return state.id;
    },
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    }
  } satisfies RadioContextValue);

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
      return false;
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
      return undefined;
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
    registerError(_id: string) {},
    unregisterError(_id: string) {}
  });
}
