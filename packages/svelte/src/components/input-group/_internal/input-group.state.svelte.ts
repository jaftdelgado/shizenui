import type { InputGroupSize, InputGroupVariant } from "./input-group.types.js";
import { useFieldStateContext } from "../../../lib/index.js";
import type { FieldStateContextResult } from "../../../lib/index.js";

export class InputGroupState {
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #variant: () => InputGroupVariant | undefined;
  #size: () => InputGroupSize | undefined;
  #id: () => string | undefined;

  readonly fieldCtx: FieldStateContextResult;

  get finalDisabled(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.disabled : (this.#disabled() ?? false);
  }

  get finalInvalid(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.invalid : (this.#invalid() ?? false);
  }

  get finalReadonly(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.readonly : (this.#readonly() ?? false);
  }

  get finalRequired(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.required : (this.#required() ?? false);
  }

  get finalVariant(): InputGroupVariant {
    return this.#variant() ?? "default";
  }

  get finalSize(): InputGroupSize {
    return this.#size() ?? "md";
  }

  get id(): string | undefined {
    return this.#id();
  }

  get inputId(): string | undefined {
    return this.fieldCtx.exists ? this.fieldCtx.inputId : undefined;
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    invalid: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    variant: () => InputGroupVariant | undefined;
    size: () => InputGroupSize | undefined;
    id: () => string | undefined;
    fieldContext?: FieldStateContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#variant = props.variant;
    this.#size = props.size;
    this.#id = props.id;

    this.fieldCtx = props.fieldContext ?? useFieldStateContext();
  }
}

export type InputGroupStateInstance = InstanceType<typeof InputGroupState>;

export function resolveInputGroupDescribedBy(
  ctx: FieldStateContextResult,
  finalInvalid: boolean,
  slots?: { hasDescription: boolean; hasError: boolean }
): { describedBy: string | undefined; errorMessageId: string | undefined } {
  if (!ctx.exists) {
    return { describedBy: undefined, errorMessageId: undefined };
  }

  return {
    describedBy: !finalInvalid && (!slots || slots.hasDescription) ? ctx.descriptionId : undefined,
    errorMessageId: finalInvalid && (!slots || slots.hasError) ? ctx.errorId : undefined
  };
}
