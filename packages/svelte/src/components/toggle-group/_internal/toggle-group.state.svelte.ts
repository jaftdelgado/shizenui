import { untrack } from "svelte";
import { SvelteSet } from "svelte/reactivity";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupRegistration } from "./toggle-group.context.js";
import type { ToggleGroupOrientation, ToggleGroupSelectionMode } from "./toggle-group.types.js";

export class ToggleGroupState {
  #variant: () => ToggleVariant;
  #size: () => ToggleSize;
  #disabled: () => boolean | undefined;
  #orientation: () => ToggleGroupOrientation;
  #hideSeparators: () => boolean;
  #selectionMode: () => ToggleGroupSelectionMode;
  #value: () => string | string[] | undefined;
  #setValue: (value: string | string[] | undefined) => void;
  #internalValues: string[] = $state([]);
  #onValueChange: () =>
    ((value: string | undefined) => void) | ((value: string[]) => void) | undefined;
  // Mutated in place on purpose: copying the Set on every register/unregister is O(N²)
  // for large toggle lists. SvelteSet keeps reads reactive without the copy.
  #toggleIds = new SvelteSet<string>();
  #toggleMap = new Map<string, ToggleGroupRegistration>();
  #activeId: string | undefined = $state(undefined);
  #resolvedActiveId = $derived.by(() => this.#computeResolvedActiveId());
  #selectedValues = $derived.by(() => new Set(this.#currentValues()));

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

  get finalSelectionMode(): ToggleGroupSelectionMode {
    return this.#selectionMode();
  }

  get finalSelectedValues(): Set<string> {
    return this.#selectedValues;
  }

  isSelected(value: string): boolean {
    return this.#selectedValues.has(value);
  }

  register(id: string, entry: ToggleGroupRegistration): void {
    untrack(() => {
      this.#toggleMap.set(id, entry);
      this.#toggleIds.add(id);
    });
  }

  unregister(id: string): void {
    untrack(() => {
      if (!this.#toggleIds.has(id)) return;

      this.#toggleIds.delete(id);
      this.#toggleMap.delete(id);

      if (this.#activeId === id) {
        this.#activeId = undefined;
      }
    });
  }

  setActiveId(id: string): void {
    if (!this.#toggleIds.has(id) || this.#toggleMap.get(id)?.getDisabled()) return;

    this.#activeId = id;
  }

  isActive(id: string): boolean {
    return id === this.#resolvedActiveId;
  }

  toggle(value: string): void {
    const mode = this.#selectionMode();

    const currentValues = this.#currentValues();

    if (mode === "single") {
      const nextValues = currentValues[0] === value ? [] : [value];
      const nextValue = nextValues[0] ?? undefined;

      this.#internalValues = nextValues;
      this.#setValue(nextValue);
      (this.#onValueChange() as ((v: string | undefined) => void) | undefined)?.(nextValue);
    } else if (mode === "multiple") {
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
    selectionMode: () => ToggleGroupSelectionMode;
    value: () => string | string[] | undefined;
    setValue: (value: string | string[] | undefined) => void;
    onValueChange: () =>
      ((value: string | undefined) => void) | ((value: string[]) => void) | undefined;
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

  #currentValues(): string[] {
    const external = this.#value();
    if (external !== undefined) {
      return Array.isArray(external) ? external : [external];
    }
    return this.#internalValues;
  }

  #computeResolvedActiveId(): string | undefined {
    if (this.#activeId !== undefined) {
      const activeEntry = this.#toggleMap.get(this.#activeId);
      if (this.#toggleIds.has(this.#activeId) && activeEntry && !activeEntry.getDisabled()) {
        return this.#activeId;
      }
    }

    for (const id of this.#toggleIds) {
      if (!this.#toggleMap.get(id)?.getDisabled()) return id;
    }

    return undefined;
  }
}
