import { setToggleGroupContext, type ToggleGroupRegistration } from "./toggle-group.context.js";
import type { ToggleGroupState } from "./toggle-group.state.svelte.js";

export function setupToggleGroupContext(state: ToggleGroupState): void {
  setToggleGroupContext({
    get variant() {
      return state.finalVariant;
    },
    get size() {
      return state.finalSize;
    },
    get disabled() {
      return state.finalDisabled;
    },
    get selectionMode() {
      return state.finalSelectionMode;
    },
    get selectedValues() {
      return state.finalSelectedValues;
    },
    get onToggle() {
      return (value: string) => state.toggle(value);
    },
    get register() {
      return (id: string, entry: ToggleGroupRegistration) => state.register(id, entry);
    },
    get unregister() {
      return (id: string) => state.unregister(id);
    },
    get isActive() {
      return (id: string) => state.isActive(id);
    },
    get setActive() {
      return (id: string) => state.setActive(id);
    }
  });
}
