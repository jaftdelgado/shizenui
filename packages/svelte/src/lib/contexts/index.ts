//Optional Context
export { createOptionalContext } from "./optional.context.js";

//FieldState Context
export {
  setFieldStateContext,
  useFieldStateContext,
  type FieldStateContextValue,
  type FieldStateContextResult
} from "./field-state.context.js";

//ContentSlot Context
export {
  setContentSlotContext,
  useContentSlotContext,
  type ContentSlotContextValue,
  type ContentSlotContextResult
} from "./content-slot.context.js";

//Surface Context
export {
  setSurfaceContext,
  useSurfaceContext,
  resolveSurfaceVariant,
  type SurfaceContextValue,
  type SurfaceContextResult
} from "./surface.context.js";

//Field contexts
export { setupFieldContexts, type FieldContextsSource } from "./field-contexts.js";
