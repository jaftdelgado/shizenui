export type {
  SwitchGroupProps,
  SwitchGroupItemsProps,
  SwitchGroupOrientation
} from "./switch-group.types.js";

export { SwitchGroupState } from "./switch-group.state.svelte.js";
export { resolveSwitchGroupDescribedBy } from "./switch-group.state.svelte.js";
export { setupSwitchGroupContexts } from "./switch-group.setup.svelte.js";
export { setupSwitchGroupForm, focusFirstSwitch } from "./switch-group.form.js";
export { setupSwitchGroupWarnings } from "./switch-group.warnings.js";

// SwitchGroup context
export { setSwitchGroupContext, useSwitchGroupContext } from "./switch-group.context.js";
export type { SwitchGroupContextValue, SwitchGroupContextResult } from "./switch-group.context.js";
