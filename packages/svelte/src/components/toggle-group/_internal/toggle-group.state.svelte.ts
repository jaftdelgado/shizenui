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

    if (mode === "single") {
      this.#internalValues = this.#internalValues[0] === value ? [] : [value];
      (this.#onValueChange() as ((v: string | undefined) => void) | undefined)?.(
        this.#internalValues[0] ?? undefined
      );
    } else {
      const exists = this.#internalValues.includes(value);
      this.#internalValues = exists
        ? this.#internalValues.filter((v) => v !== value)
        : [...this.#internalValues, value];
      (this.#onValueChange() as ((v: string[]) => void) | undefined)?.(this.#internalValues);
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
    onValueChange: () => ((value: string | undefined) => void) | ((value: string[]) => void) | undefined;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#orientation = props.orientation;
    this.#hideSeparator = props.hideSeparator;
    this.#selectionMode = props.selectionMode;
    this.#value = props.value;
    this.#onValueChange = props.onValueChange;
  }
}
