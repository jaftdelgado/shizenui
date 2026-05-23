import { setSwitchContext } from "./switch.context.js";
import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  let hasContent = $state(false);
  let labelId = $state<string | undefined>(undefined);
  let descriptionId = $state<string | undefined>(undefined);

  setSwitchContext({
    get checked() {
      return props.checked();
    },
    get disabled() {
      return state.finalDisabled;
    },
    get invalid() {
      return state.finalInvalid;
    },
    get id() {
      return props.id();
    },
    get size() {
      return state.finalSize;
    },
    get hasContent() {
      return hasContent;
    },
    get hasLabel() {
      return labelId !== undefined;
    },
    get hasDescription() {
      return descriptionId !== undefined;
    },
    get labelId() {
      return labelId;
    },
    get descriptionId() {
      return descriptionId;
    },
    registerContent() {
      hasContent = true;
    },
    registerLabel(id: string) {
      labelId = id;
    },
    registerDescription(id: string) {
      descriptionId = id;
    }
  });

  setFieldStateContext({
    get invalid() {
      return state.finalInvalid;
    },
    get disabled() {
      return state.finalDisabled;
    },
    get required() {
      return false;
    },
    get id() {
      return props.id();
    },
    get keepDescription() {
      return true;
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
    }
  });
}
