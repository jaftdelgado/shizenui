import { useSurfaceContext, resolveSurfaceVariant } from "../../../lib/index.js";
import type { FieldStateContextResult, SurfaceContextResult } from "../../../lib/index.js";
import type { TextFieldSize, TextFieldVariant } from "./text-field.types.js";

export class TextFieldState {
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #value: () => string;
  #setValue: (value: string) => void;
  #size: () => TextFieldSize | undefined;
  #variant: () => TextFieldVariant | undefined;
  #id: () => string;
  #submissionInvalid: () => boolean;
  #setSubmissionInvalid: (invalid: boolean) => void;
  #nativeValid = $state(true);
  readonly surfaceCtx: SurfaceContextResult;

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get rawDisabled(): boolean | undefined {
    return this.#disabled();
  }

  get finalReadonly(): boolean {
    return this.#readonly() ?? false;
  }

  get rawReadonly(): boolean | undefined {
    return this.#readonly();
  }

  get finalRequired(): boolean {
    return this.#required() ?? false;
  }

  get rawRequired(): boolean | undefined {
    return this.#required();
  }

  get finalInvalid(): boolean {
    return (this.#invalid() ?? false) || this.#submissionInvalid();
  }

  get rawInvalid(): boolean | undefined {
    return this.#invalid();
  }

  get isNativeValid(): boolean {
    return this.#nativeValid;
  }

  get value(): string {
    return this.#value();
  }

  get finalSize(): TextFieldSize {
    return this.#size() ?? "md";
  }

  get rawSize(): TextFieldSize | undefined {
    return this.#size();
  }

  get finalVariant(): TextFieldVariant {
    return resolveSurfaceVariant(this.#variant(), this.surfaceCtx, "default", "secondary");
  }

  get rawVariant(): TextFieldVariant | undefined {
    return this.#variant();
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    invalid: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    value: () => string;
    setValue: (value: string) => void;
    size: () => TextFieldSize | undefined;
    variant: () => TextFieldVariant | undefined;
    id: () => string;
    submissionInvalid: () => boolean;
    setSubmissionInvalid: (invalid: boolean) => void;
    surfaceContext?: SurfaceContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#value = props.value;
    this.#setValue = props.setValue;
    this.#size = props.size;
    this.#variant = props.variant;
    this.#id = props.id;
    this.#submissionInvalid = props.submissionInvalid;
    this.#setSubmissionInvalid = props.setSubmissionInvalid;
    this.surfaceCtx = props.surfaceContext ?? useSurfaceContext();
  }

  reportInvalid(): void {
    this.#nativeValid = false;
    this.#setSubmissionInvalid(true);
  }

  setValue(value: string): void {
    this.#setValue(value);
  }

  reportValidity(valid: boolean): void {
    this.#nativeValid = valid;
  }

  resetValidation(): void {
    this.#nativeValid = true;
    this.#setSubmissionInvalid(false);
  }
}

export type TextFieldStateInstance = InstanceType<typeof TextFieldState>;

export function resolveTextFieldControlDescribedBy(
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
