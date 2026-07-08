import { useRadioGroupContext } from "../../radio-group/_internal/radio-group.context.js";
import type { RadioGroupContextResult } from "../../radio-group/_internal/radio-group.context.js";
import { useFieldStateContext, type FieldStateContextResult } from "../../../lib/index.js";

export class RadioState {
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #name: () => string | undefined;
  #id: () => string;
  #checked: () => boolean;
  #value: () => string;

  readonly groupCtx: RadioGroupContextResult;
  readonly parentFieldCtx: FieldStateContextResult;

  get finalDisabled(): boolean {
    const local = this.#disabled();
    if (local !== undefined) return local;
    return this.groupCtx.exists
      ? this.groupCtx.disabled
      : this.parentFieldCtx.exists
        ? this.parentFieldCtx.disabled
        : false;
  }

  get finalReadonly(): boolean {
    const local = this.#readonly();
    if (local !== undefined) return local;
    return this.groupCtx.exists
      ? this.groupCtx.readonly
      : this.parentFieldCtx.exists
        ? this.parentFieldCtx.readonly
        : false;
  }

  get finalInvalid(): boolean {
    const local = this.#invalid();
    if (local !== undefined) return local;
    return this.groupCtx.exists
      ? this.groupCtx.invalid
      : this.parentFieldCtx.exists
        ? this.parentFieldCtx.invalid
        : false;
  }

  get activeName(): string | undefined {
    return this.groupCtx.exists ? this.groupCtx.name : this.#name();
  }

  get isChecked(): boolean {
    return this.groupCtx.exists ? this.groupCtx.value === this.#value() : this.#checked();
  }

  get value(): string {
    return this.#value();
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    value: () => string;
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    invalid: () => boolean | undefined;
    name: () => string | undefined;
    id: () => string;
    checked: () => boolean;
    groupContext?: RadioGroupContextResult;
    fieldContext?: FieldStateContextResult;
  }) {
    this.#value = props.value;
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#invalid = props.invalid;
    this.#name = props.name;
    this.#id = props.id;
    this.#checked = props.checked;

    this.groupCtx = props.groupContext ?? useRadioGroupContext();
    this.parentFieldCtx = props.fieldContext ?? useFieldStateContext();
  }
}

export type RadioStateInstance = InstanceType<typeof RadioState>;
