import { warnIf } from "./warn.svelte.js";

/**
 * Guards a compound component against rendering outside its required
 * context. Logs a dev warning when the condition is true and returns
 * a reactive shouldRender flag that is false when context is missing.
 * Uses $effect (via warnIf) and $derived internally — must be called
 * at the top level of a Svelte component.
 *
 * @param condition - returns true when context is missing
 * @param component - component name for the warning (e.g. "Switch.Control")
 * @param message - descriptive warning message
 */
export function assertContext(
  condition: () => boolean,
  component: string,
  message: string
): { readonly shouldRender: boolean } {
  warnIf(condition, component, message);
  const shouldRender = $derived(!condition());
  return {
    get shouldRender() {
      return shouldRender;
    }
  };
}
