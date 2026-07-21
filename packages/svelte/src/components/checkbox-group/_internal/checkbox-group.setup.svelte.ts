import { setCheckboxGroupContext } from "./checkbox-group.context.js";
import type { CheckboxGroupContextValue } from "./checkbox-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { CheckboxGroupState } from "./checkbox-group.state.svelte.js";

export function setupCheckboxGroupContexts(state: CheckboxGroupState): void {
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());
  let errorIds = $state(new Set<string>());

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
