import { setSwitchGroupContext } from "./switch-group.context.js";
import type { SwitchGroupContextValue } from "./switch-group.context.js";
import { setFieldStateContext, setContentSlotContext } from "../../../lib/index.js";
import { SwitchGroupState } from "./switch-group.state.svelte.js";

export function setupSwitchGroupContexts(
  state: SwitchGroupState,
  props: { id: () => string }
): void {
  let labelIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());

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
    },
    get labelId() {
      return `${props.id()}-label`;
    },
    get descriptionId() {
      return `${props.id()}-description`;
    },
    get hasLabel() {
      return labelIds.size > 0;
    },
    get hasDescription() {
      return descriptionIds.size > 0;
    }
  } satisfies SwitchGroupContextValue);

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
    get errorId() {
      return undefined;
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
    registerError(_id: string) {},
    unregisterError(_id: string) {}
  });
}
