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
  /** Where the range of an extension starts: the last value toggled, or set with `setAnchor`. */
  #anchor: string | undefined;
  /** The values the extension in progress selected, which the next step of it replaces. */
  #extended: readonly string[] = [];
  /** Where the extension in progress last ended. */
  #extendedTo: string | undefined;

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

    this.setAnchor(value);
    this.#commit(before, next);
  };

  /** Makes `value` the start of the next range and ends the extension in progress, if any. */
  readonly setAnchor = (value: string): void => {
    this.#anchor = value;
    this.#extended = [];
    this.#extendedTo = undefined;
  };

  /**
   * Selects the range from the anchor to `target` (multiple mode only). `ordered` is every value
   * that can be selected, in the order the user sees them. The values that were selected outside
   * the extension in progress stay selected; the previous step of the extension is replaced, so
   * going back toward the anchor shrinks the range.
   *
   * `origin` is where a keyboard extension comes from (the item focus left). The extension in
   * progress continues only from where it last ended; from anywhere else a new one starts, with
   * `origin` as its anchor. A pointer extension has no origin and starts at the anchor. Without
   * an anchor, or with one that is no longer in `ordered`, the range starts at `target`.
   */
  readonly extendTo = (ordered: readonly string[], target: string, origin?: string): void => {
    if (this.#props.mode() !== "multiple") return;

    const targetIndex = ordered.indexOf(target);
    if (targetIndex === -1) return;

    if (origin !== undefined && origin !== this.#extendedTo) this.setAnchor(origin);

    const anchorIndex = this.#anchor === undefined ? -1 : ordered.indexOf(this.#anchor);
    if (anchorIndex === -1) this.#anchor = target;

    const from = anchorIndex === -1 ? targetIndex : Math.min(anchorIndex, targetIndex);
    const to = anchorIndex === -1 ? targetIndex : Math.max(anchorIndex, targetIndex);
    const range = ordered.slice(from, to + 1);

    const before = [...this.#props.values()];
    const kept = before.filter((v) => !this.#extended.includes(v));
    this.#extended = range;
    this.#extendedTo = target;

    this.#commit(before, [...kept, ...range.filter((v) => !kept.includes(v))]);
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

/** Whether both hold the same values, in any order. */
function haveSameValues(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && b.every((v) => a.includes(v));
}
