import { setSwitchGroupContext } from "./switch-group.context.js";
import { setFieldStateContext } from "../../../lib/index.js";
import { SwitchGroupState } from "./switch-group.state.svelte.js";

export function setupSwitchGroupContexts(
  state: SwitchGroupState,
  props: { id: () => string }
): { getLabelId: () => string | undefined; getDescriptionId: () => string | undefined } {
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
    get labelId() {
      return `${props.id()}-label`;
    },
    get descriptionId() {
      return `${props.id()}-description`;
    },
    get keepDescription() {
      return false;
    }
  });
  return {
    getLabelId: () => `${props.id()}-label`,
    getDescriptionId: () => `${props.id()}-description`
  };
}
