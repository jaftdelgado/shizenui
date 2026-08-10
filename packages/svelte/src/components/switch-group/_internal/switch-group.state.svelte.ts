import type { SwitchSize } from "../../switch/_internal/switch.types.js";
import type { SwitchGroupOrientation, SwitchGroupProps } from "./switch-group.types.js";
import type { SwitchGroupContextResult } from "./switch-group.context.js";

export class SwitchGroupState {
  #value: () => SwitchGroupProps["value"];
  #onValueChange: () => ((value: string[]) => void) | undefined;
  #name: () => string | undefined;
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #required: () => boolean | undefined;
  #size: () => SwitchSize;
  #orientation: () => SwitchGroupOrientation;
  #submissionInvalid: () => boolean;
  #setValue: (value: string[]) => void;
  #id: () => string;
  #selectedSet = $derived(new Set(this.finalValue));

  get finalValue(): string[] {
    return this.#value() ?? [];
  }

  get finalName(): string | undefined {
    return this.#name();
  }

  get hasSelection(): boolean {
    return this.finalValue.length > 0;
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalReadonly(): boolean {
    return this.#readonly() ?? false;
  }

  get finalInvalid(): boolean {
    return (this.#invalid() ?? false) || this.#submissionInvalid();
  }

  get finalRequired(): boolean {
    return this.#required() ?? false;
  }

  get finalSize(): SwitchSize {
    return this.#size();
  }

  get finalOrientation(): SwitchGroupOrientation {
    return this.#orientation();
  }

  get id(): string {
    return this.#id();
  }

  isSelected(value: string): boolean {
    return this.#selectedSet.has(value);
  }

  toggleValue(value: string): void {
    const current = this.finalValue;
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    this.#setValue(next);
    this.#onValueChange()?.(next);
  }

  constructor(props: {
    value: () => SwitchGroupProps["value"];
    onValueChange: () => ((value: string[]) => void) | undefined;
    name: () => string | undefined;
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    invalid: () => boolean | undefined;
    required: () => boolean | undefined;
    size: () => SwitchSize;
    orientation: () => SwitchGroupOrientation;
    submissionInvalid: () => boolean;
    setValue: (value: string[]) => void;
    id: () => string;
  }) {
    this.#value = props.value;
    this.#onValueChange = props.onValueChange;
    this.#name = props.name;
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#invalid = props.invalid;
    this.#required = props.required;
    this.#size = props.size;
    this.#orientation = props.orientation;
    this.#submissionInvalid = props.submissionInvalid;
    this.#setValue = props.setValue;
    this.#id = props.id;
  }
}

export type SwitchGroupStateInstance = InstanceType<typeof SwitchGroupState>;

export function resolveSwitchGroupDescribedBy(
  ctx: Pick<SwitchGroupContextResult, "hasError" | "errorId" | "hasDescription" | "descriptionId">,
  externalDescribedBy?: string | null
): string | undefined {
  const ids = [
    externalDescribedBy,
    ctx.hasError ? ctx.errorId : ctx.hasDescription ? ctx.descriptionId : null
  ]
    .flatMap((value) => value?.trim().split(/\s+/) ?? [])
    .filter(Boolean);

  return ids.length > 0 ? [...new Set(ids)].join(" ") : undefined;
}
