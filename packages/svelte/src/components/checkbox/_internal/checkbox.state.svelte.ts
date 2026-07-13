import { useFieldStateContext } from "../../../lib/index.js";
import type { FieldStateContextResult } from "../../../lib/index.js";

export class CheckboxState {
  #checked: () => boolean;
  #indeterminate: () => boolean;
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #value: () => string | undefined;
  #name: () => string | undefined;
  #id: () => string;

  readonly parentFieldCtx: FieldStateContextResult;
  // TODO: CheckboxGroup context — pendiente, no implementado en este scope.
  // Cuando exista CheckboxGroup, agregar `readonly groupCtx: CheckboxGroupContextResult`
  // y anteponerlo en cada cascada final*, igual que RadioState.groupCtx.

  get finalDisabled(): boolean {
    const local = this.#disabled();
    if (local !== undefined) return local;
    return this.parentFieldCtx.exists ? this.parentFieldCtx.disabled : false;
  }

  get finalReadonly(): boolean {
    const local = this.#readonly();
    if (local !== undefined) return local;
    return this.parentFieldCtx.exists ? this.parentFieldCtx.readonly : false;
  }

  get finalInvalid(): boolean {
    const local = this.#invalid();
    if (local !== undefined) return local;
    return this.parentFieldCtx.exists ? this.parentFieldCtx.invalid : false;
  }

  get finalRequired(): boolean {
    const local = this.#required();
    if (local !== undefined) return local;
    return this.parentFieldCtx.exists ? this.parentFieldCtx.required : false;
  }

  get isChecked(): boolean {
    return this.#checked();
  }

  get isIndeterminate(): boolean {
    return this.#indeterminate();
  }

  get value(): string | undefined {
    return this.#value();
  }

  get name(): string | undefined {
    return this.#name();
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    checked: () => boolean;
    indeterminate: () => boolean;
    disabled: () => boolean | undefined;
    invalid: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    value: () => string | undefined;
    name: () => string | undefined;
    id: () => string;
    fieldContext?: FieldStateContextResult;
  }) {
    this.#checked = props.checked;
    this.#indeterminate = props.indeterminate;
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#value = props.value;
    this.#name = props.name;
    this.#id = props.id;

    this.parentFieldCtx = props.fieldContext ?? useFieldStateContext();
  }
}

export type CheckboxStateInstance = InstanceType<typeof CheckboxState>;
