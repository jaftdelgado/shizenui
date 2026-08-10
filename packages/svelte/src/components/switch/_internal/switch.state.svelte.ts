import { useFieldStateContext } from "../../../lib/index.js";
import type { FieldStateContextResult } from "../../../lib/index.js";
import { useSwitchGroupContext } from "../../switch-group/_internal/switch-group.context.js";
import type { SwitchGroupContextResult } from "../../switch-group/_internal/switch-group.context.js";
import type { SwitchSize } from "./switch.types.js";

export class SwitchState {
  #checked: () => boolean;
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #required: () => boolean | undefined;
  #size: () => SwitchSize;
  #submissionInvalid: () => boolean;
  #name: () => string | undefined;
  #value: () => string | undefined;
  #id: () => string;

  readonly groupCtx: SwitchGroupContextResult;
  readonly parentFieldCtx: FieldStateContextResult;

  get finalChecked(): boolean {
    return this.groupCtx.exists
      ? this.value !== undefined && this.groupCtx.isSelected(this.value)
      : this.#checked();
  }

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

    if (this.groupCtx.exists) return false;

    return this.parentFieldCtx.exists ? this.parentFieldCtx.required : false;
  }

  get finalSize(): SwitchSize {
    return this.groupCtx.exists ? this.groupCtx.size : this.#size();
  }

  get finalName(): string | undefined {
    const local = this.#name();
    if (local !== undefined) return local;
    return this.groupCtx.exists ? this.groupCtx.name : undefined;
  }

  get value(): string | undefined {
    return this.#value();
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    checked: () => boolean;
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    invalid: () => boolean | undefined;
    required: () => boolean | undefined;
    size: () => SwitchSize;
    submissionInvalid: () => boolean;
    name: () => string | undefined;
    value: () => string | undefined;
    id: () => string;
    groupContext?: SwitchGroupContextResult;
    fieldContext?: FieldStateContextResult;
  }) {
    this.#checked = props.checked;
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#invalid = props.invalid;
    this.#required = props.required;
    this.#size = props.size;
    this.#submissionInvalid = props.submissionInvalid;
    this.#name = props.name;
    this.#value = props.value;
    this.#id = props.id;
    this.groupCtx = props.groupContext ?? useSwitchGroupContext();
    this.parentFieldCtx = props.fieldContext ?? useFieldStateContext();
  }
}

export type SwitchStateInstance = InstanceType<typeof SwitchState>;

export function resolveSwitchDescribedBy(
  state: SwitchStateInstance,
  ctx: {
    hasDescription: boolean;
    hasError: boolean;
  },
  id: string,
  externalDescribedBy?: string | null
): string | undefined {
  const ids = [
    externalDescribedBy,
    ctx.hasError ? `${id}-error` : ctx.hasDescription ? `${id}-description` : null,
    state.groupCtx.exists
      ? state.groupCtx.hasError
        ? state.groupCtx.errorId
        : state.groupCtx.hasDescription
          ? state.groupCtx.descriptionId
          : null
      : null
  ]
    .flatMap((value) => value?.trim().split(/\s+/) ?? [])
    .filter(Boolean);

  return ids.length > 0 ? [...new Set(ids)].join(" ") : undefined;
}
