import { setSwitchContext } from "./switch.context.js";
import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  let contentIds = $state(new Set<string>());
  let labelId = $state<string | undefined>(undefined);
  let descriptionId = $state<string | undefined>(undefined);

  setSwitchContext({
    get checked() {
      return props.checked();
    },
    get disabled() {
      return state.finalDisabled;
    },
    get readonly() {
      return state.finalReadonly;
    },
    get id() {
      return props.id();
    },
    get size() {
      return state.finalSize;
    },
    get hasContent() {
      return contentIds.size > 0;
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
    get inputId() {
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
    },
    unregisterLabel(id: string) {
      if (labelId === id) labelId = undefined;
    },
    unregisterDescription(id: string) {
      if (descriptionId === id) descriptionId = undefined;
    }
  });
}
