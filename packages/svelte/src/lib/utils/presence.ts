/**
 * Converts a boolean to a presence attribute value.
 * Returns an empty string when true (attribute present),
 * or undefined when false (attribute absent).
 * Use for data-* attributes driven by boolean state.
 */
export function presence(value: boolean): "" | undefined {
  return value ? "" : undefined;
}
