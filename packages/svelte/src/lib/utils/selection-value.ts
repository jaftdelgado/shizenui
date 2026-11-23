// The modes of a selection, as `SelectionState` names them. Declared here: `lib/utils` does not
// import from `lib/runes`.
type SelectionMode = "none" | "single" | "multiple";

/** The public value of a selection: a string in single mode, an array in multiple mode. */
export type SelectionValue = string | string[] | undefined;

/** The public `onValueChange`, whose argument has the shape of the mode. */
export type SelectionValueChange =
  ((value: string | undefined) => void) | ((value: string[]) => void);

/** The selected values as an array, whatever the shape of the public value. */
export function toSelectionValues(value: SelectionValue): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/** The public shape of `values` for `mode`: the first value in single mode, else the array. */
export function fromSelectionValues(mode: SelectionMode, values: string[]): SelectionValue {
  return mode === "single" ? values[0] : values;
}

/**
 * Calls `onValueChange` with the shape of `mode`. `mode` decides the shape at runtime, which the
 * types of the props cannot express: the only casts live here.
 */
export function emitSelectionValueChange(
  mode: SelectionMode,
  onValueChange: SelectionValueChange | undefined,
  values: string[]
): void {
  if (!onValueChange) return;

  if (mode === "single") {
    (onValueChange as (value: string | undefined) => void)(values[0]);
  } else {
    (onValueChange as (value: string[]) => void)(values);
  }
}
