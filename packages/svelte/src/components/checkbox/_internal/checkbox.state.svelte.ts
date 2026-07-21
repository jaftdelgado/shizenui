import { useCheckboxGroupContext } from "../../checkbox-group/_internal/checkbox-group.context.js";
import type { CheckboxGroupContextResult } from "../../checkbox-group/_internal/checkbox-group.context.js";
import { useFieldStateContext } from "../../../lib/index.js";
import type { FieldStateContextResult } from "../../../lib/index.js";

export class CheckboxState {
  #checked: () => boolean;
  #indeterminate: () => boolean;
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #submissionInvalid: () => boolean;
  #value: () => string | undefined;
  #name: () => string | undefined;
  #id: () => string;

  readonly groupCtx: CheckboxGroupContextResult;
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
    const cascadeInvalid =
      local !== undefined
        ? local
        : this.groupCtx.exists
          ? this.groupCtx.invalid
          : this.parentFieldCtx.exists
            ? this.parentFieldCtx.invalid
            : false;
    return cascadeInvalid || this.#submissionInvalid();
  }

  get finalRequired(): boolean {
    const local = this.#required();
    if (local !== undefined) return local;

    // `required` belongs exclusively to the group when this checkbox is grouped:
    // CheckboxGroup.required means "at least one option selected" (a relational
    // validation resolved by its sentinel input), not "every option must be checked".
    // Do not read groupCtx.required or parentFieldCtx.required here because the latter
    // is the group's required value within a CheckboxGroup.
    if (this.groupCtx.exists) return false;

    return this.parentFieldCtx.exists ? this.parentFieldCtx.required : false;
  }

  get isChecked(): boolean {
    return this.groupCtx.exists
      ? this.value !== undefined && this.groupCtx.isSelected(this.value)
      : this.#checked();
  }

  get isIndeterminate(): boolean {
    return this.#indeterminate();
  }

  get value(): string | undefined {
    return this.#value();
  }

  get name(): string | undefined {
    const local = this.#name();
    if (local !== undefined) return local;
    return this.groupCtx.exists ? this.groupCtx.name : undefined;
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
    submissionInvalid: () => boolean;
    value: () => string | undefined;
    name: () => string | undefined;
    id: () => string;
    groupContext?: CheckboxGroupContextResult;
    fieldContext?: FieldStateContextResult;
  }) {
    this.#checked = props.checked;
    this.#indeterminate = props.indeterminate;
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#submissionInvalid = props.submissionInvalid;
    this.#value = props.value;
    this.#name = props.name;
    this.#id = props.id;

    this.groupCtx = props.groupContext ?? useCheckboxGroupContext();
    this.parentFieldCtx = props.fieldContext ?? useFieldStateContext();
  }
}

export type CheckboxStateInstance = InstanceType<typeof CheckboxState>;
