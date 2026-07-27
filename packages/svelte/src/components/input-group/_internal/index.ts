export type {
  InputGroupProps,
  InputGroupVariant,
  InputGroupKind,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
  InputGroupInputProps,
  InputGroupTextAreaProps
} from "./input-group.types.js";

export { InputGroupState } from "./input-group.state.svelte.js";
export type { InputGroupStateInstance } from "./input-group.state.svelte.js";

export { setupInputGroupContexts } from "./input-group.setup.svelte.js";

// Intentionally no handlers, registration, or form layer: InputGroup uses native input focus,
// has no parent group registration, and owns no hidden form control.
export { setInputGroupContext, useInputGroupContext } from "./input-group.context.js";
export type { InputGroupContextValue, InputGroupContextResult } from "./input-group.context.js";
