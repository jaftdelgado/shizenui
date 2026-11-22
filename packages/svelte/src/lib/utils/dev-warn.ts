import { DEV } from "esm-env";

/**
 * Logs a shizen-ui warning, in development only: `[shizen-ui] <Component>: message`. For a
 * warning about a condition that can change, use `warnIf`, which watches it.
 */
export function devWarn(component: string, message: string): void {
  if (!DEV) return;
  console.warn(`[shizen-ui] <${component}>: ${message}`);
}
