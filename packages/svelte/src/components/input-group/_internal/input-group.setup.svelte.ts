import type { InputGroupKind } from "./input-group.types.js";
import type { InputGroupStateInstance } from "./input-group.state.svelte.js";
import { setInputGroupContext, type InputGroupContextValue } from "./input-group.context.js";

export function setupInputGroupContexts(state: InputGroupStateInstance): void {
  let kind = $state<InputGroupKind | null>(null);

  setInputGroupContext({
    get disabled() {
      return state.finalDisabled;
    },
    get readonly() {
      return state.finalReadonly;
    },
    get invalid() {
      return state.finalInvalid;
    },
    get required() {
      return state.finalRequired;
    },
    get variant() {
      return state.finalVariant;
    },
    get size() {
      return state.finalSize;
    },
    get kind() {
      return kind;
    },
    get id() {
      return state.id;
    },
    setKind(next: InputGroupKind | null) {
      kind = next;
    }
  } satisfies InputGroupContextValue);
}
