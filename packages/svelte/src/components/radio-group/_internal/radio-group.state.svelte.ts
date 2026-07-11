import type { RadioGroupRegistration } from "./radio-group.context.js";
import type { RadioGroupOrientation, RadioGroupProps } from "./radio-group.types.js";

export class RadioGroupState {
  #value: () => RadioGroupProps["value"];
  #onValueChange: () => ((value: string) => void) | undefined;
  #name: () => string | undefined;
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #required: () => boolean | undefined;
  #orientation: () => RadioGroupOrientation | undefined;
  #id: () => string;
  #setValue: (value: string) => void;

  #itemIds: string[] = $state([]);
  #itemMap = new Map<string, RadioGroupRegistration>();
  #focusedItemId: string | undefined = $state(undefined);
  #focusedValue: string | undefined;

  get finalValue(): string | undefined {
    return this.#value();
  }

  get finalName(): string | undefined {
    return this.#name();
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalReadonly(): boolean {
    return this.#readonly() ?? false;
  }

  get finalInvalid(): boolean {
    return this.#invalid() ?? false;
  }

  get finalRequired(): boolean {
    return this.#required() ?? false;
  }

  get finalOrientation(): RadioGroupOrientation {
    return this.#orientation() ?? "vertical";
  }

  get finalValueIsValid(): boolean {
    return this.finalValue !== undefined && this.#findIdByValue(this.finalValue) !== undefined;
  }

  get id(): string {
    return this.#id();
  }

  setValue(value: string): void {
    if (value === this.finalValue) return;

    this.#setValue(value);
    this.#onValueChange()?.(value);

    const matchingId = this.#findIdByValue(value);
    if (matchingId !== undefined) {
      this.#focusedItemId = matchingId;
    }
    this.#focusedValue = value;
  }

  register(id: string, entry: RadioGroupRegistration): void {
    this.#itemMap.set(id, entry);
    if (this.#itemIds.includes(id)) return;

    this.#itemIds = [...this.#itemIds, id];
  }

  unregister(id: string): void {
    if (!this.#itemIds.includes(id)) return;

    this.#itemIds = this.#itemIds.filter((itemId) => itemId !== id);
    this.#itemMap.delete(id);

    if (this.#focusedItemId === id) {
      this.#focusedItemId = undefined;
    }
  }

  isActive(id: string): boolean {
    const index = this.#itemIds.indexOf(id);
    if (index === -1) return false;

    return index === this.#getActiveIndex();
  }

  moveFocus(direction: "next" | "prev"): void {
    const currentIndex = this.#getActiveIndex();
    if (currentIndex === -1) return;

    const nextIndex =
      direction === "next"
        ? this.#findEnabledIndexWrapping(currentIndex, 1)
        : this.#findEnabledIndexWrapping(currentIndex, -1);

    if (nextIndex === -1) return;

    this.#focusEntry(nextIndex, { select: true });
  }

  focusFirstEnabled(options: { select: boolean } = { select: false }): void {
    const index = this.#findEnabledIndex(0, 1);
    if (index === -1) return;

    this.#focusEntry(index, options);
  }

  focusLastEnabled(options: { select: boolean } = { select: false }): void {
    const index = this.#findEnabledIndex(this.#itemIds.length - 1, -1);
    if (index === -1) return;

    this.#focusEntry(index, options);
  }

  clearFocusOverride(): void {
    this.#focusedItemId = undefined;
  }

  constructor(props: {
    value: () => RadioGroupProps["value"];
    onValueChange: () => ((value: string) => void) | undefined;
    name: () => string | undefined;
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    invalid: () => boolean | undefined;
    required: () => boolean | undefined;
    orientation: () => RadioGroupOrientation | undefined;
    id: () => string;
    setValue: (value: string) => void;
  }) {
    this.#value = props.value;
    this.#onValueChange = props.onValueChange;
    this.#name = props.name;
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#invalid = props.invalid;
    this.#required = props.required;
    this.#orientation = props.orientation;
    this.#id = props.id;
    this.#setValue = props.setValue;
  }

  #getActiveIndex(): number {
    const overrideValid =
      this.#focusedItemId !== undefined && this.finalValue === this.#focusedValue;

    if (overrideValid) {
      const overrideIndex = this.#itemIds.indexOf(this.#focusedItemId!);
      if (overrideIndex !== -1 && !this.#getEntryByIndex(overrideIndex)?.getDisabled()) {
        return overrideIndex;
      }
    }

    if (this.finalValue !== undefined) {
      const matchingId = this.#findIdByValue(this.finalValue);
      const selectedIndex = matchingId !== undefined ? this.#itemIds.indexOf(matchingId) : -1;
      if (selectedIndex !== -1) return selectedIndex;
    }

    return this.#findEnabledIndex(0, 1);
  }

  #focusEntry(index: number, options: { select: boolean }): void {
    const entry = this.#getEntryByIndex(index);
    if (!entry) return;

    this.#focusedItemId = this.#itemIds[index];
    entry.getRef()?.focus();

    if (options.select && !this.finalReadonly) {
      this.setValue(entry.getValue());
    }

    this.#focusedValue = this.finalValue;
  }

  #findIdByValue(value: string): string | undefined {
    return this.#itemIds.find((id) => this.#itemMap.get(id)?.getValue() === value);
  }

  #findEnabledIndex(startIndex: number, direction: 1 | -1): number {
    for (let index = startIndex; index >= 0 && index < this.#itemIds.length; index += direction) {
      if (!this.#getEntryByIndex(index)?.getDisabled()) {
        return index;
      }
    }

    return -1;
  }

  #findEnabledIndexWrapping(startIndex: number, direction: 1 | -1): number {
    const total = this.#itemIds.length;
    if (total === 0) return -1;

    for (let step = 1; step <= total; step += 1) {
      const index = (startIndex + direction * step + total) % total;
      if (!this.#getEntryByIndex(index)?.getDisabled()) {
        return index;
      }
    }

    return -1;
  }

  #getEntryByIndex(index: number): RadioGroupRegistration | undefined {
    const id = this.#itemIds[index];
    return id ? this.#itemMap.get(id) : undefined;
  }
}

export type RadioGroupStateInstance = InstanceType<typeof RadioGroupState>;
