import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { setSwitchContext } from "./switch.context.js";
import type { SwitchContextValue } from "./switch.context.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());
  let errorIds = $state(new Set<string>());

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
