export type { TextFieldProps, TextFieldSize, TextFieldVariant } from "./text-field.types.js";

export { TextFieldState, resolveTextFieldControlDescribedBy } from "./text-field.state.svelte.js";
export type { TextFieldStateInstance } from "./text-field.state.svelte.js";

export { setupTextFieldContexts } from "./text-field.setup.svelte.js";

export { setupTextFieldSubmissionInvalid } from "./text-field.form.js";

export { createTextFieldControlHandlers } from "./text-field.handlers.js";
export type { TextFieldControlHandlers, ValidityReporter } from "./text-field.handlers.js";

export { setTextFieldContext, useTextFieldContext } from "./text-field.context.js";
export type {
  TextFieldContextValue,
  TextFieldContextResult,
  TextFieldControl
} from "./text-field.context.js";
