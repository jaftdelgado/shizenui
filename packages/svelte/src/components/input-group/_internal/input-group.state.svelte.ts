import { useFieldStateContext } from "../../../lib/index.js";
import type { FieldStateContextResult } from "../../../lib/index.js";
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
  #nativeValid = $state(true);

  readonly fieldCtx: FieldStateContextResult;
  readonly textFieldCtx: TextFieldContextResult;

  get finalDisabled(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.disabled : (this.#disabled() ?? false);
  }

  // Standalone branch now tracks native validation failures too, mirroring
  // TextFieldState.finalInvalid. When fieldCtx.exists (InputGroup sits inside
  // a <TextField>), TextField already owns this signal — do not double up.
  get finalInvalid(): boolean {
    return this.fieldCtx.exists
      ? this.fieldCtx.invalid
      : (this.#invalid() ?? false) || this.#submissionInvalid() || !this.#nativeValid;
  }

  get finalReadonly(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.readonly : (this.#readonly() ?? false);
  }

  get finalRequired(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.required : (this.#required() ?? false);
  }

  get finalVariant(): InputGroupVariant {
    return this.textFieldCtx.exists ? this.textFieldCtx.variant : (this.#variant() ?? "default");
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
    fieldContext?: FieldStateContextResult;
    textFieldContext?: TextFieldContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#variant = props.variant;
    this.#size = props.size;
    this.#id = props.id;
    this.#submissionInvalid = props.submissionInvalid;

    this.fieldCtx = props.fieldContext ?? useFieldStateContext();
    this.textFieldCtx = props.textFieldContext ?? useTextFieldContext();
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

export type InputGroupStateInstance = InstanceType<typeof InputGroupState>;
