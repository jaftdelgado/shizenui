import { warnIf } from "./warn.svelte.js";

/**
 * Guards a compound component against rendering outside its required
 * context. Logs a dev warning (via warnIf) when the condition is true and
 * returns whether the component should render.
 *
 * The result is a plain boolean evaluated once, when the component
 * initializes: whether a context exists cannot change during the life of a
 * component, so there is nothing to keep reactive. Must be called at the
 * top level of a Svelte component because warnIf registers an effect.
 *
 * @param condition - returns true when context is missing
 * @param component - component name for the warning (e.g. "Switch.Control")
 * @param message - descriptive warning message
 * @returns false when context is missing, true otherwise
 */
export function assertContext(
  condition: () => boolean,
  component: string,
  message: string
): boolean {
  warnIf(condition, component, message);
  return !condition();
}
