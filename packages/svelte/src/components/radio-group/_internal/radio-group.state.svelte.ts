import type { RadioGroupRegistration } from "./radio-group.context.js";
import type { RadioGroupOrientation, RadioGroupProps } from "./radio-group.types.js";

export class RadioGroupState {
  #value: () => RadioGroupProps["value"];
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

  get id(): string {
    return this.#id();
  }

  setValue(value: string): void {
    this.#setValue(value);
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
  }

  focusFirstEnabled(): void {
    const index = this.#findEnabledIndex(0, 1);
    if (index === -1) return;

    this.#getEntryByIndex(index)?.getRef()?.focus();
  }

  focusLastEnabled(): void {
    const index = this.#findEnabledIndex(this.#itemIds.length - 1, -1);
    if (index === -1) return;

    this.#getEntryByIndex(index)?.getRef()?.focus();
  }

  constructor(props: {
    value: () => RadioGroupProps["value"];
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
    this.#name = props.name;
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#invalid = props.invalid;
    this.#required = props.required;
    this.#orientation = props.orientation;
    this.#id = props.id;
    this.#setValue = props.setValue;
  }

  #findEnabledIndex(startIndex: number, direction: 1 | -1): number {
    for (let index = startIndex; index >= 0 && index < this.#itemIds.length; index += direction) {
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
