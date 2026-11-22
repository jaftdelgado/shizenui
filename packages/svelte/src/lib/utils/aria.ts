/** The props that give an element an accessible name of the consumer's choosing. */
export interface AccessibleNameProps {
  "aria-label"?: string | null;
  "aria-labelledby"?: string | null;
}

/**
 * Whether the consumer named the element with `aria-label` or `aria-labelledby`. `null`,
 * `undefined` and an empty string do not name it, so the component's own name applies.
 */
export function hasOwnAccessibleName(props: AccessibleNameProps): boolean {
  return Boolean(props["aria-label"] || props["aria-labelledby"]);
}

/**
 * `true` when the value is true; otherwise `undefined`, so the attribute is left out instead of
 * rendering as `"false"`.
 */
export function ariaBool(value: boolean): true | undefined {
  return value ? true : undefined;
}
