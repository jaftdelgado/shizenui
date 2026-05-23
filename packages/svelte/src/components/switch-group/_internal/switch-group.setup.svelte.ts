import { setSwitchGroupContext } from "./switch-group.context.js";
import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { SwitchGroupState } from "./switch-group.state.svelte.js";

export function setupSwitchGroupContexts(
  state: SwitchGroupState,
  props: { id: () => string }
): { getLabelId: () => string | undefined; getDescriptionId: () => string | undefined } {
  let labelId = $state<string | undefined>(undefined);
  let descriptionId = $state<string | undefined>(undefined);

  setSwitchGroupContext({
    get disabled() {
      return state.finalDisabled;
    },
    get readonly() {
      return state.finalReadonly;
    },
    get size() {
      return state.finalSize;
    },
    get orientation() {
      return state.finalOrientation;
    }
  });

  setFieldStateContext({
    get invalid() {
      return false;
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
      return props.id();
    },
    get keepDescription() {
      return false;
    }
  });

  setContentSlotContext({
    get labelId() {
      return labelId;
    },
    get descriptionId() {
      return descriptionId;
    },
    registerLabel(id: string) {
      labelId = id;
    },
    registerDescription(id: string) {
      descriptionId = id;
    },
    unregisterLabel() {
      labelId = undefined;
    },
    unregisterDescription() {
      descriptionId = undefined;
    }
  });

  return {
    getLabelId: () => labelId,
    getDescriptionId: () => descriptionId
  };
}
