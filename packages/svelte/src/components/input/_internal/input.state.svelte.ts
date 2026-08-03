import { useFieldStateContext } from "../../../lib/index.js";
import type { FieldStateContextResult } from "../../../lib/index.js";
import { useTextFieldContext } from "../../text-field/_internal/text-field.context.js";
import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";
import type { InputSize, InputVariant } from "./input.types.js";

export class InputState {
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #variant: () => InputVariant | undefined;
  #size: () => InputSize | undefined;
  #id: () => string;
  #submissionInvalid: () => boolean;

  readonly fieldCtx: FieldStateContextResult;
  readonly textFieldCtx: TextFieldContextResult;

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

  get finalVariant(): InputVariant {
    return this.textFieldCtx.exists ? this.textFieldCtx.variant : (this.#variant() ?? "default");
  }

  get finalSize(): InputSize {
    return this.textFieldCtx.exists ? this.textFieldCtx.size : (this.#size() ?? "md");
  }

  get id(): string {
    return this.#id();
  }

  get finalId(): string {
    return this.fieldCtx.exists ? (this.fieldCtx.inputId ?? this.#id()) : this.#id();
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    invalid: () => boolean | undefined;
    variant: () => InputVariant | undefined;
    size: () => InputSize | undefined;
    id: () => string;
    submissionInvalid: () => boolean;
    fieldContext?: FieldStateContextResult;
    textFieldContext?: TextFieldContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#invalid = props.invalid;
    this.#variant = props.variant;
    this.#size = props.size;
    this.#id = props.id;
    this.#submissionInvalid = props.submissionInvalid;

    this.fieldCtx = props.fieldContext ?? useFieldStateContext();
    this.textFieldCtx = props.textFieldContext ?? useTextFieldContext();
  }
}

export type InputStateInstance = InstanceType<typeof InputState>;
