import { setSwitchContext } from "./switch.context.js";
import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  let contentIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());

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
    get hasDescription() {
      return descriptionIds.size > 0;
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
    get labelId() {
      return `${props.id()}-label`;
    },
    get descriptionId() {
      return `${props.id()}-description`;
    },
    get keepDescription() {
      return true;
    }
  });

  setContentSlotContext({
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
    }
  });
}
