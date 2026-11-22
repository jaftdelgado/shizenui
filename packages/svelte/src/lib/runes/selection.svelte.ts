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

  // Plain, not reactive: they only decide what the next range covers, nothing renders them.
  /** Where a range starts: the last value selected, or the first target of a range. */
  #anchor: string | undefined;
  /** Where the last range ended, so the next one can replace it. */
  #current: string | undefined;

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

    if (!isSelected) {
      // A selected value starts the next range.
      this.#anchor = value;
      this.#current = value;
    } else if (value === this.#anchor) {
      // Deselecting the anchor leaves no anchor: the next range starts at its target.
      this.#anchor = undefined;
      this.#current = undefined;
    }

    this.#commit(before, next);
  };

  /**
   * Selects the range from the anchor to `target` (multiple mode only), as React Aria does. `ordered`
   * is every value that can be selected, in the order the user sees them.
   *
   * The anchor is the last value selected (moving focus does not change it), so the item that has
   * focus is not selected unless the range covers it. Without an anchor, or with one that is no
   * longer in `ordered`, the range starts at `target` and `target` becomes the anchor. The
   * previous range (anchor to where it ended) is replaced, so going back toward the anchor
   * shrinks it; the values selected outside it stay selected.
   */
  readonly extendTo = (ordered: readonly string[], target: string): void => {
    if (this.#props.mode() !== "multiple") return;

    // Built once: the lookups below would otherwise scan `ordered` each time, which adds up on a
    // long list. The first index of a value, as `indexOf` would find it.
    const indexes = new Map<string, number>();
    ordered.forEach((v, i) => {
      if (!indexes.has(v)) indexes.set(v, i);
    });

    if (!indexes.has(target)) return;

    const anchor = this.#anchor !== undefined && indexes.has(this.#anchor) ? this.#anchor : target;
    const current =
      this.#current !== undefined && indexes.has(this.#current) ? this.#current : target;

    const previous = rangeOf(ordered, indexes, anchor, current);
    const range = rangeOf(ordered, indexes, anchor, target);

    const before = [...this.#props.values()];
    const previousSet = new Set(previous);
    const kept = before.filter((v) => !previousSet.has(v));
    const keptSet = new Set(kept);

    this.#anchor = anchor;
    this.#current = target;
    this.#commit(before, [...kept, ...range.filter((v) => !keptSet.has(v))]);
  };

  /** Writes `next` and reports it, unless nothing changes or the owner rejected the change. */
  #commit(before: readonly string[], next: string[]): void {
    if (haveSameValues(before, next)) return;

    this.#props.setValues(next);

    // A function binding can reject the change: only notify when the values really changed.
    const after = this.#props.values();
    if (haveSameValues(before, after)) return;

    this.#props.onChange?.([...after]);
  }
}

/** The values of `ordered` from `a` to `b`, both included, in either direction. */
function rangeOf(
  ordered: readonly string[],
  indexes: ReadonlyMap<string, number>,
  a: string,
  b: string
): string[] {
  const indexA = indexes.get(a);
  const indexB = indexes.get(b);
  if (indexA === undefined || indexB === undefined) return [];
  return ordered.slice(Math.min(indexA, indexB), Math.max(indexA, indexB) + 1);
}

/**
 * Whether both hold the same values, in any order. Compared through sets, so it stays linear on a
 * long selection, and `[x, y]` is not taken for `[x, x]`.
 */
function haveSameValues(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;

  const setA = new Set(a);
  const setB = new Set(b);
  return setA.size === setB.size && b.every((v) => setA.has(v));
}
