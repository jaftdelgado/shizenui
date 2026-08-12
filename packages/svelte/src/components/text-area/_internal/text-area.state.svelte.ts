import {
  resolveSurfaceVariant,
  useFieldStateContext,
  useSurfaceContext
} from "../../../lib/index.js";
import type { FieldStateContextResult, SurfaceContextResult } from "../../../lib/index.js";
import { useTextFieldContext } from "../../text-field/_internal/text-field.context.js";
import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";
import type { TextAreaVariant } from "./text-area.types.js";

export class TextAreaState {
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #variant: () => TextAreaVariant | undefined;
  #id: () => string;
  #submissionInvalid: () => boolean;
  #nativeValid = $state(true);

  readonly fieldCtx: FieldStateContextResult;
  readonly textFieldCtx: TextFieldContextResult;
  readonly surfaceCtx: SurfaceContextResult;

  get finalDisabled(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.disabled : (this.#disabled() ?? false);
  }

  get finalReadonly(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.readonly : (this.#readonly() ?? false);
  }

  get finalRequired(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.required : (this.#required() ?? false);
  }

  get finalInvalid(): boolean {
    return this.fieldCtx.exists
      ? this.fieldCtx.invalid
      : (this.#invalid() ?? false) || this.#submissionInvalid();
  }

  get finalVariant(): TextAreaVariant {
    return this.textFieldCtx.exists
      ? this.textFieldCtx.variant
      : resolveSurfaceVariant(this.#variant(), this.surfaceCtx, "default", "secondary");
  }

  get finalId(): string {
    return this.fieldCtx.exists ? (this.fieldCtx.inputId ?? this.#id()) : this.#id();
  }

  get isNativeValid(): boolean {
    return this.#nativeValid;
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    invalid: () => boolean | undefined;
    variant: () => TextAreaVariant | undefined;
    id: () => string;
    submissionInvalid: () => boolean;
    fieldContext?: FieldStateContextResult;
    textFieldContext?: TextFieldContextResult;
    surfaceContext?: SurfaceContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#invalid = props.invalid;
    this.#variant = props.variant;
    this.#id = props.id;
    this.#submissionInvalid = props.submissionInvalid;

    this.fieldCtx = props.fieldContext ?? useFieldStateContext();
    this.textFieldCtx = props.textFieldContext ?? useTextFieldContext();
    this.surfaceCtx = props.surfaceContext ?? useSurfaceContext();
  }

  reportInvalid(): void {
    this.#nativeValid = false;
  }

  reportValidity(valid: boolean): void {
    this.#nativeValid = valid;
  }

  resetValidation(): void {
    this.#nativeValid = true;
  }
}

export type TextAreaStateInstance = InstanceType<typeof TextAreaState>;
