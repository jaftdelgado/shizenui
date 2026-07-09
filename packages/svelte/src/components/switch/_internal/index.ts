export type {
  SwitchProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchContentProps,
  SwitchSize,
  SwitchRenderState
} from "./switch.types.js";

export { SwitchState } from "./switch.state.svelte.js";
export { setupSwitchContexts } from "./switch.setup.svelte.js";

export { createSwitchHandlers } from "./switch.handlers.svelte.js";
export type { SwitchHandlers } from "./switch.handlers.svelte.js";

export { setSwitchContext, useSwitchContext } from "./switch.context.js";
export type { SwitchContextValue, SwitchContextResult } from "./switch.context.js";
