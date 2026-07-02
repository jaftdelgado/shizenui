import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupOrientation, ToggleGroupSelectionMode } from "./toggle-group.types.js";

export class ToggleGroupState {
  #variant: () => ToggleVariant;
  #size: () => ToggleSize;
  #disabled: () => boolean | undefined;
  #orientation: () => ToggleGroupOrientation;
  #hideSeparator: () => boolean;
  #selectionMode: () => ToggleGroupSelectionMode | undefined;
  #value: () => string | string[] | undefined;
  #setValue: (value: string | string[] | undefined) => void;
  #internalValues: string[] = $state([]);
  #onValueChange: () => ((value: string | undefined) => void) | ((value: string[]) => void) | undefined;

  get finalVariant(): ToggleVariant {
    return this.#variant();
  }

  get finalSize(): ToggleSize {
    return this.#size();
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalOrientation(): ToggleGroupOrientation {
    return this.#orientation();
  }

  get finalHideSeparator(): boolean {
    return this.#hideSeparator();
  }

  get finalSelectionMode(): ToggleGroupSelectionMode | undefined {
    return this.#selectionMode();
  }

  get finalSelectedValues(): Set<string> {
    const external = this.#value();
    if (external !== undefined) {
      return new Set(Array.isArray(external) ? external : [external]);
    }
    return new Set(this.#internalValues);
  }

  toggle(value: string): void {
    const mode = this.#selectionMode();
    if (!mode) return;

    const current = this.#value();
    const currentValues =
      current !== undefined ? (Array.isArray(current) ? current : [current]) : this.#internalValues;

    if (mode === "single") {
      const nextValues = currentValues[0] === value ? [] : [value];
      const nextValue = nextValues[0] ?? undefined;

      this.#internalValues = nextValues;
      this.#setValue(nextValue);
      (this.#onValueChange() as ((v: string | undefined) => void) | undefined)?.(nextValue);
    } else {
      const exists = currentValues.includes(value);
      const nextValues = exists
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      this.#internalValues = nextValues;
      this.#setValue(nextValues);
      (this.#onValueChange() as ((v: string[]) => void) | undefined)?.(nextValues);
    }
  }

  constructor(props: {
    variant: () => ToggleVariant;
    size: () => ToggleSize;
    disabled: () => boolean | undefined;
    orientation: () => ToggleGroupOrientation;
    hideSeparator: () => boolean;
    selectionMode: () => ToggleGroupSelectionMode | undefined;
    value: () => string | string[] | undefined;
    setValue: (value: string | string[] | undefined) => void;
    onValueChange: () => ((value: string | undefined) => void) | ((value: string[]) => void) | undefined;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#orientation = props.orientation;
    this.#hideSeparator = props.hideSeparator;
    this.#selectionMode = props.selectionMode;
    this.#value = props.value;
    this.#setValue = props.setValue;
    this.#onValueChange = props.onValueChange;
  }
}
