import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupRegistration } from "./toggle-group.context.js";
import type { ToggleGroupOrientation, ToggleGroupSelectionMode } from "./toggle-group.types.js";

export class ToggleGroupState {
  #variant: () => ToggleVariant;
  #size: () => ToggleSize;
  #disabled: () => boolean | undefined;
  #orientation: () => ToggleGroupOrientation;
  #hideSeparators: () => boolean;
  #selectionMode: () => ToggleGroupSelectionMode | undefined;
  #value: () => string | string[] | undefined;
  #setValue: (value: string | string[] | undefined) => void;
  #internalValues: string[] = $state([]);
  #onValueChange: () =>
    | ((value: string | undefined) => void)
    | ((value: string[]) => void)
    | undefined;
  #toggleIds: string[] = $state([]);
  #toggleMap = new Map<string, ToggleGroupRegistration>();
  #activeIndex = $state(0);

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

  get finalHideSeparators(): boolean {
    return this.#hideSeparators();
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

  isSelected(value: string): boolean {
    const external = this.#value();
    if (external !== undefined) {
      return Array.isArray(external) ? external.includes(value) : external === value;
    }
    return this.#internalValues.includes(value);
  }

  register(id: string, entry: ToggleGroupRegistration): void {
    this.#toggleMap.set(id, entry);
    if (this.#toggleIds.includes(id)) return;

    this.#toggleIds = [...this.#toggleIds, id];

    const resolvedActiveIndex = this.#resolveActiveIndex();
    if (resolvedActiveIndex === -1) {
      const firstEnabledIndex = this.#findEnabledIndex(0, 1);
      if (firstEnabledIndex !== -1) {
        this.#activeIndex = firstEnabledIndex;
      }
    }
  }

  unregister(id: string): void {
    const entryIndex = this.#toggleIds.indexOf(id);
    if (entryIndex === -1) return;

    const activeIndex = this.#resolveActiveIndex();
    const wasActive = activeIndex === entryIndex;

    this.#toggleIds = this.#toggleIds.filter((toggleId) => toggleId !== id);
    this.#toggleMap.delete(id);

    if (this.#toggleIds.length === 0) {
      this.#activeIndex = 0;
      return;
    }

    if (wasActive) {
      const nextIndex = this.#findEnabledIndex(entryIndex, 1);
      if (nextIndex !== -1) {
        this.#activeIndex = nextIndex;
        return;
      }

      const previousIndex = this.#findEnabledIndex(entryIndex - 1, -1);
      this.#activeIndex = previousIndex !== -1 ? previousIndex : 0;
      return;
    }

    if (activeIndex > entryIndex) {
      this.#activeIndex = activeIndex - 1;
    }
  }

  setActive(id: string): void {
    const entryIndex = this.#toggleIds.indexOf(id);
    if (entryIndex === -1 || this.#getEntryByIndex(entryIndex)?.getDisabled()) return;

    this.#activeIndex = entryIndex;
  }

  isActive(id: string): boolean {
    const entryIndex = this.#toggleIds.indexOf(id);
    if (entryIndex === -1 || this.#getEntryByIndex(entryIndex)?.getDisabled()) return false;

    return entryIndex === this.#resolveActiveIndex();
  }

  moveFocus(direction: "next" | "prev"): void {
    const activeIndex = this.#resolveActiveIndex();
    if (activeIndex === -1) return;

    const nextIndex =
      direction === "next"
        ? this.#findEnabledIndex(activeIndex + 1, 1)
        : this.#findEnabledIndex(activeIndex - 1, -1);

    if (nextIndex === -1) return;

    this.#activeIndex = nextIndex;
    this.#getEntryByIndex(nextIndex)?.getRef()?.focus();
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
    hideSeparators: () => boolean;
    selectionMode: () => ToggleGroupSelectionMode | undefined;
    value: () => string | string[] | undefined;
    setValue: (value: string | string[] | undefined) => void;
    onValueChange: () =>
      | ((value: string | undefined) => void)
      | ((value: string[]) => void)
      | undefined;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#orientation = props.orientation;
    this.#hideSeparators = props.hideSeparators;
    this.#selectionMode = props.selectionMode;
    this.#value = props.value;
    this.#setValue = props.setValue;
    this.#onValueChange = props.onValueChange;
  }

  #resolveActiveIndex(): number {
    const activeEntry = this.#getEntryByIndex(this.#activeIndex);
    if (activeEntry && !activeEntry.getDisabled()) {
      return this.#activeIndex;
    }

    return this.#findEnabledIndex(0, 1);
  }

  #findEnabledIndex(startIndex: number, direction: 1 | -1): number {
    for (let index = startIndex; index >= 0 && index < this.#toggleIds.length; index += direction) {
      if (!this.#getEntryByIndex(index)?.getDisabled()) {
        return index;
      }
    }

    return -1;
  }

  #getEntryByIndex(index: number): ToggleGroupRegistration | undefined {
    const id = this.#toggleIds[index];
    return id ? this.#toggleMap.get(id) : undefined;
  }
}
