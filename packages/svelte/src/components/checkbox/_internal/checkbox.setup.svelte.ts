import { setCheckboxContext } from "./checkbox.context.js";
import type { CheckboxContextValue } from "./checkbox.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { CheckboxState } from "./checkbox.state.svelte.js";

export function setupCheckboxContexts(state: CheckboxState): void {
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());
  let errorIds = $state(new Set<string>());

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
