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

  #itemIds: Set<string> = $state(new Set());
  #itemMap = new Map<string, RadioGroupRegistration>();
  #activeId: string | undefined = $state(undefined);
  #activeValueSnapshot: string | undefined;

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
    this.setActiveId(matchingId);
  }

  register(id: string, entry: RadioGroupRegistration): void {
    this.#itemMap.set(id, entry);
    if (this.#itemIds.has(id)) return;

    const next = new Set(this.#itemIds);
    next.add(id);
    this.#itemIds = next;
  }

  unregister(id: string): void {
    if (!this.#itemIds.has(id)) return;

    const next = new Set(this.#itemIds);
    next.delete(id);
    this.#itemIds = next;
    this.#itemMap.delete(id);

    if (this.#activeId === id) {
      this.#activeId = undefined;
    }
  }

  isActive(id: string): boolean {
    return id === this.#resolvedActiveId();
  }

  setActiveId(id: string | undefined): void {
    this.#activeId = id;
    this.#activeValueSnapshot = this.finalValue;
  }

  getValueForId(id: string): string | undefined {
    return this.#itemMap.get(id)?.getValue();
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

  #resolvedActiveId(): string | undefined {
    const overrideValid =
      this.#activeId !== undefined && this.finalValue === this.#activeValueSnapshot;

    if (overrideValid) {
      const entry = this.#itemMap.get(this.#activeId!);
      if (this.#itemIds.has(this.#activeId!) && entry && !entry.getDisabled()) {
        return this.#activeId;
      }
    }

    if (this.finalValue !== undefined) {
      const matchingId = this.#findIdByValue(this.finalValue);
      if (matchingId !== undefined) return matchingId;
    }

    for (const id of this.#itemIds) {
      if (!this.#itemMap.get(id)?.getDisabled()) return id;
    }

    return undefined;
  }

  #findIdByValue(value: string): string | undefined {
    for (const id of this.#itemIds) {
      if (this.#itemMap.get(id)?.getValue() === value) return id;
    }
    return undefined;
  }
}

export type RadioGroupStateInstance = InstanceType<typeof RadioGroupState>;
