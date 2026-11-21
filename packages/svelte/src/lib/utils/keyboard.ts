/** The keys that only modify other keys: pressing one alone is not a keyboard interaction. */
const MODIFIER_KEYS: ReadonlySet<string> = new Set(["Shift", "Control", "Alt", "Meta"]);

/** Whether `key` (a `KeyboardEvent.key`) only modifies other keys, like `Shift` or `Meta`. */
export function isModifierKey(key: string): boolean {
  return MODIFIER_KEYS.has(key);
}
