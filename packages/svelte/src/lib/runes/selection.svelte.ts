export type SelectionStateMode = "none" | "single" | "multiple";

export interface SelectionStateProps {
  mode: () => SelectionStateMode;
  /** The selected values. In single mode, at most one. */
  values: () => readonly string[];
  /** Writes the next selected values. The owner decides how it stores them. */
  setValues: (values: string[]) => void;
  /** Called after a toggle that really changed the selected values. */
  onChange?: (values: string[]) => void;
}

/**
 * Selection of string values for single and multiple modes. It does not own the value: it reads
 * it through `values` and writes through `setValues`, so it works with bindable and controlled
 * values alike. Its methods are readonly arrow fields so they can be destructured.
 *
 * It always works with an array, whatever the mode: turning it into the public shape (a string
 * in single mode) is the owner's job, at its own boundary.
 *
 * The props are getters that are read when called, never when constructing, so a class that
 * builds it in a field initializer can pass closures over its own `#props`.
 */
export class SelectionState {
  readonly #props: SelectionStateProps;

  #selectedValues = $derived.by(() => new Set(this.#props.values()));

  constructor(props: SelectionStateProps) {
    this.#props = props;
  }

  readonly isSelected = (value: string): boolean => this.#selectedValues.has(value);

  readonly toggle = (value: string): void => {
    const mode = this.#props.mode();
    if (mode === "none") return;

    // Snapshot: a consumer setter may mutate the array it was given.
    const before = [...this.#props.values()];
    const isSelected = before.includes(value);

    let next: string[];
    if (mode === "single") {
      next = isSelected ? [] : [value];
    } else {
      next = isSelected ? before.filter((v) => v !== value) : [...before, value];
    }

    this.#props.setValues(next);

    // A function binding can reject the change: only notify when the values really changed.
    const after = this.#props.values();
    if (after.length === before.length && after.every((v, i) => v === before[i])) return;

    this.#props.onChange?.([...after]);
  };
}
