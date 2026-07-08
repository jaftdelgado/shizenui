import { onDestroy } from "svelte";
import { setRadioContext } from "./radio.context.js";
import type { RadioContextValue } from "./radio.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { RadioState } from "./radio.state.svelte.js";

export function setupRadioContexts(state: RadioState): void {
  let contentIds = $state(new Set<string>());
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
    get hasContent() {
      return contentIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    },
    registerContent(id: string) {
      if (contentIds.has(id)) return;
      const next = new Set(contentIds);
      next.add(id);
      contentIds = next;
    },
    unregisterContent(id: string) {
      if (!contentIds.has(id)) return;
      const next = new Set(contentIds);
      next.delete(id);
      contentIds = next;
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

  setContentSlotContext({
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
