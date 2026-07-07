import { setRadioContext } from "./radio.context.js";
import type { RadioContextValue } from "./radio.context.js";
import { setFieldStateContext } from "../../../lib/index.js";
import type { RadioState } from "./radio.state.svelte.js";

export function setupRadioContexts(state: RadioState): void {
  setRadioContext({
    get checked() {
      return state.isChecked;
    },
    get disabled() {
      return state.finalDisabled;
    },
    get invalid() {
      return state.finalInvalid;
    },
    get id() {
      return state.id;
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
      return false;
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
    get keepDescription() {
      return true;
    }
  });
}
