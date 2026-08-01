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

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalReadonly(): boolean {
    return this.#readonly() ?? false;
  }

  get finalRequired(): boolean {
    return this.#required() ?? false;
  }

  get finalInvalid(): boolean {
    return (this.#invalid() ?? false) || this.#submissionInvalid();
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

  get finalVariant(): TextFieldVariant {
    return this.#variant() ?? "default";
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
