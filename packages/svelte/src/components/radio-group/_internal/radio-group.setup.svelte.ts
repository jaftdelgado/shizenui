import { setRadioGroupContext } from "./radio-group.context.js";
import type { RadioGroupContextValue, RadioGroupRegistration } from "./radio-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import type { RadioGroupState } from "./radio-group.state.svelte.js";

export function setupRadioGroupContexts(state: RadioGroupState): void {
  let itemsInstanceIds = $state(new Set<string>());
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());
  let errorIds = $state(new Set<string>());

  setRadioGroupContext({
    get value() {
      return state.finalValue;
    },
    get hasSelection() {
      return state.hasSelection;
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
    get hasItems() {
      return itemsInstanceIds.size > 0;
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
    setValue(value: string) {
      state.setValue(value);
    },
    register(id: string, entry: RadioGroupRegistration) {
      state.register(id, entry);
    },
    unregister(id: string) {
      state.unregister(id);
    },
    isActive(id: string) {
      return state.isActive(id);
    },
    setActiveId(id: string | undefined) {
      state.setActiveId(id);
    },
    getValueForId(id: string) {
      return state.getValueForId(id);
    },
    registerItems(id: string) {
      if (itemsInstanceIds.has(id)) return;
      const next = new Set(itemsInstanceIds);
      next.add(id);
      itemsInstanceIds = next;
    },
    unregisterItems(id: string) {
      if (!itemsInstanceIds.has(id)) return;
      const next = new Set(itemsInstanceIds);
      next.delete(id);
      itemsInstanceIds = next;
    }
  } satisfies RadioGroupContextValue);

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
