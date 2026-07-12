import { onDestroy } from "svelte";
import { setRadioContext } from "./radio.context.js";
import type { RadioContextValue } from "./radio.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { RadioState } from "./radio.state.svelte.js";

export function setupRadioContexts(state: RadioState): void {
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());

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
    registerError(_id: string) {},
    unregisterError(_id: string) {}
  });
}

export function setupRadioGroupRegistration(state: RadioState): void {
  const entry = {
    getDisabled: () => state.finalDisabled,
    getValue: () => state.value
  };

  state.groupCtx.register(state.id, entry);

  onDestroy(() => {
    state.groupCtx.unregister(state.id);
  });
}
