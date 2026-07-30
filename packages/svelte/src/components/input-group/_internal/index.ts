export type {
  InputGroupProps,
  InputGroupVariant,
  InputGroupSize,
  InputGroupKind,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
  InputGroupInputProps,
  InputGroupTextAreaProps
} from "./input-group.types.js";

export { InputGroupState } from "./input-group.state.svelte.js";
export type { InputGroupStateInstance } from "./input-group.state.svelte.js";

export { setupInputGroupContexts } from "./input-group.setup.svelte.js";
export { createInputGroupHandlers } from "./input-group.handlers.js";
export type { InputGroupHandlers } from "./input-group.handlers.js";

// No registration or form layer: InputGroup has no parent group and owns no hidden form
// control. It does have a handlers layer (input-group.handlers.ts) that redirects focus to the
// underlying Input/TextArea when clicking non-interactive areas of Prefix/Suffix.
export { setInputGroupContext, useInputGroupContext } from "./input-group.context.js";
export type { InputGroupContextValue, InputGroupContextResult } from "./input-group.context.js";
