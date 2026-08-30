import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { createIdRegistry } from "../../../lib/runes/index.js";
import { setSwitchGroupContext } from "./switch-group.context.js";
import type { SwitchGroupContextValue } from "./switch-group.context.js";
import type { SwitchGroupState } from "./switch-group.state.svelte.js";

export function setupSwitchGroupContexts(
  state: SwitchGroupState,
  props: { id: () => string }
): void {
  const labelIds = createIdRegistry();
  const descriptionIds = createIdRegistry();
  const errorIds = createIdRegistry();

  setSwitchGroupContext({
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
    get size() {
      return state.finalSize;
    },
    get orientation() {
      return state.finalOrientation;
    },
    get labelId() {
      return `${props.id()}-label`;
    },
    get descriptionId() {
      return `${props.id()}-description`;
    },
    get errorId() {
      return `${props.id()}-error`;
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
  } satisfies SwitchGroupContextValue);

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
      return false;
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
