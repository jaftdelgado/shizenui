import { setSwitchContext } from "./switch.context.js";
import { setFieldStateContext } from "../../../lib/index.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  let hasContent = $state(false);
  let hasLabel = $state(false);
  let hasDescription = $state(false);

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
      return hasLabel;
    },
    get hasDescription() {
      return hasDescription;
    },
    registerContent() {
      hasContent = true;
    },
    registerLabel() {
      hasLabel = true;
    },
    registerDescription() {
      hasDescription = true;
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
    },
    registerLabel() {
      hasLabel = true;
    },
    registerDescription() {
      hasDescription = true;
    }
  });
}
