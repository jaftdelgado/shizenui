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
    isSelected(value: string) {
      return state.isSelected(value);
    },
    onToggle(value: string) {
      state.toggle(value);
    },
    register(id: string, entry: ToggleGroupRegistration) {
      state.register(id, entry);
    },
    unregister(id: string) {
      state.unregister(id);
    },
    isActive(id: string) {
      return state.isActive(id);
    },
    setActiveId(id: string) {
      state.setActiveId(id);
    }
  });
}
