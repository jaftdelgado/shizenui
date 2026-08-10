export type {
  SwitchProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchContentProps,
  SwitchSize,
  SwitchClickEvent,
  SwitchRenderState
} from "./switch.types.js";

export { SwitchState } from "./switch.state.svelte.js";
export { resolveSwitchDescribedBy } from "./switch.state.svelte.js";
export { setupSwitchContexts } from "./switch.setup.svelte.js";
export { setupSwitchForm } from "./switch.form.js";
export { setupSwitchWarnings } from "./switch.warnings.js";

export { createSwitchHandlers } from "./switch.handlers.js";
export type { SwitchHandlers } from "./switch.handlers.js";

export { setSwitchContext, useSwitchContext } from "./switch.context.js";
export type { SwitchContextValue, SwitchContextResult } from "./switch.context.js";
