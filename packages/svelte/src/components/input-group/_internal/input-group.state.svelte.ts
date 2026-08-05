import {
  resolveSurfaceVariant,
  useFieldStateContext,
  useSurfaceContext
} from "../../../lib/index.js";
import type { FieldStateContextResult, SurfaceContextResult } from "../../../lib/index.js";
import { useTextFieldContext } from "../../text-field/_internal/text-field.context.js";
import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";
import type { InputGroupSize, InputGroupVariant } from "./input-group.types.js";

export class InputGroupState {
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #variant: () => InputGroupVariant | undefined;
  #size: () => InputGroupSize | undefined;
  #id: () => string | undefined;
  #submissionInvalid: () => boolean;
  #setSubmissionInvalid: (invalid: boolean) => void;
  #nativeValid = $state(true);

  readonly fieldCtx: FieldStateContextResult;
  readonly textFieldCtx: TextFieldContextResult;
  readonly surfaceCtx: SurfaceContextResult;

  get finalDisabled(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.disabled : (this.#disabled() ?? false);
  }

  get finalInvalid(): boolean {
    return this.fieldCtx.exists
      ? this.fieldCtx.invalid
      : (this.#invalid() ?? false) || this.#submissionInvalid();
  }

  get finalReadonly(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.readonly : (this.#readonly() ?? false);
  }

  get finalRequired(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.required : (this.#required() ?? false);
  }

  get finalVariant(): InputGroupVariant {
    return this.textFieldCtx.exists
      ? this.textFieldCtx.variant
      : resolveSurfaceVariant(this.#variant(), this.surfaceCtx, "default", "secondary");
  }

  get finalSize(): InputGroupSize {
    return this.textFieldCtx.exists ? this.textFieldCtx.size : (this.#size() ?? "md");
  }

  get id(): string | undefined {
    return this.#id();
  }

  get inputId(): string | undefined {
    return this.fieldCtx.exists ? this.fieldCtx.inputId : undefined;
  }

  get isNativeValid(): boolean {
    return this.#nativeValid;
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    invalid: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    variant: () => InputGroupVariant | undefined;
    size: () => InputGroupSize | undefined;
    id: () => string | undefined;
    submissionInvalid: () => boolean;
    setSubmissionInvalid: (invalid: boolean) => void;
    fieldContext?: FieldStateContextResult;
    textFieldContext?: TextFieldContextResult;
    surfaceContext?: SurfaceContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#variant = props.variant;
    this.#size = props.size;
    this.#id = props.id;
    this.#submissionInvalid = props.submissionInvalid;
    this.#setSubmissionInvalid = props.setSubmissionInvalid;

    this.fieldCtx = props.fieldContext ?? useFieldStateContext();
    this.textFieldCtx = props.textFieldContext ?? useTextFieldContext();
    this.surfaceCtx = props.surfaceContext ?? useSurfaceContext();
  }

  reportInvalid(): void {
    this.#nativeValid = false;
    this.#setSubmissionInvalid(true);
  }

  reportValidity(valid: boolean): void {
    this.#nativeValid = valid;
  }

  resetValidation(): void {
    this.#nativeValid = true;
    this.#setSubmissionInvalid(false);
  }
}

export type InputGroupStateInstance = InstanceType<typeof InputGroupState>;
