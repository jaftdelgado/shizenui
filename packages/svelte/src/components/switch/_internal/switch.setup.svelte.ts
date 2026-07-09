import { setSwitchContext } from "./switch.context.js";
import type { SwitchContextValue } from "./switch.context.js";
import { setContentSlotContext, setFieldStateContext } from "../../../lib/index.js";
import { SwitchState } from "./switch.state.svelte.js";

export function setupSwitchContexts(
  state: SwitchState,
  props: { checked: () => boolean; id: () => string }
): void {
  let labelIds = $state(new Set<string>());
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
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    }
  } satisfies SwitchContextValue);

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
    get errorId() {
      return undefined;
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
    registerError(_id: string) {},
    unregisterError(_id: string) {}
  });
}
