import { onDestroy } from "svelte";
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
    get readonly() {
      return state.finalReadonly;
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
    get keepDescription() {
      return true;
    }
  });
}

export function setupRadioGroupRegistration(
  state: RadioState,
  getRef: () => HTMLInputElement | null
): void {
  const entry = {
    getRef,
    getDisabled: () => state.finalDisabled
  };

  state.groupCtx.register(state.id, entry);

  onDestroy(() => {
    state.groupCtx.unregister(state.id);
  });
}
