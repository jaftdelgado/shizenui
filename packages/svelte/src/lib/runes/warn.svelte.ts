import { DEV } from "esm-env";

/**
 * Logs a warning in development mode when a condition is true.
 * Uses $effect internally, so it must be called at the top level of a Svelte component.
 * Outside development (production builds) it returns early and creates no effect at all.
 *
 * @param condition - function returning true when the warning should be logged
 * @param component - component name for context (e.g. "Switch", "Input", "Checkbox")
 * @param message - descriptive warning message
 *
 * @example
 * warnIf(() => !children, "Switch", "No children provided. Add at least <Switch.Control /> as a child.");
 */
export function warnIf(condition: () => boolean, component: string, message: string): void {
  if (!DEV) return;

  let hasWarned = false;

  $effect(() => {
    if (condition() && !hasWarned) {
      console.warn(`[shizen-ui] <${component}>: ${message}`);
      hasWarned = true;
    }
  });
}
