export type {
  InputGroupProps,
  InputGroupVariant,
  InputGroupSize,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
  InputGroupInputProps,
  InputGroupTextAreaProps,
  InputGroupInputEvent,
  InputGroupInputInvalidEvent,
  InputGroupTextAreaEvent,
  InputGroupTextAreaInvalidEvent
} from "./input-group.types.js";

export { InputGroupState } from "./input-group.state.svelte.js";
export type { InputGroupStateInstance } from "./input-group.state.svelte.js";

export { setupInputGroupContexts } from "./input-group.setup.svelte.js";
export { createInputGroupControlRegistration } from "./input-group.registration.js";

export {
  setupInputGroupSubmissionInvalid,
  syncInputGroupControlValidity
} from "./input-group.form.js";
export { createInputGroupHandlers } from "./input-group.handlers.js";
export type { InputGroupHandlers } from "./input-group.handlers.js";

export { setInputGroupContext, useInputGroupContext } from "./input-group.context.js";
export type { InputGroupContextValue, InputGroupContextResult } from "./input-group.context.js";
