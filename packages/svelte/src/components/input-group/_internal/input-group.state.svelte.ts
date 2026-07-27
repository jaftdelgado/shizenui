import type { InputGroupSize, InputGroupVariant } from "./input-group.types.js";

export class InputGroupState {
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #variant: () => InputGroupVariant | undefined;
  #size: () => InputGroupSize | undefined;
  #id: () => string;

  get finalDisabled(): boolean {
    // TODO: once <TextField> exists and produces FieldStateContext, extend this to the standard
    // cascade `local ?? parentFieldCtx.disabled ?? false`, mirroring CheckboxState.finalDisabled.
    return this.#disabled() ?? false;
  }

  get finalInvalid(): boolean {
    // TODO: once <TextField> exists and produces FieldStateContext, extend this to the standard
    // cascade `local ?? parentFieldCtx.invalid ?? false`, mirroring CheckboxState.finalInvalid.
    return this.#invalid() ?? false;
  }

  get finalReadonly(): boolean {
    // TODO: once <TextField> exists and produces FieldStateContext, extend this to the standard
    // cascade `local ?? parentFieldCtx.readonly ?? false`, mirroring CheckboxState.finalReadonly.
    return this.#readonly() ?? false;
  }

  get finalRequired(): boolean {
    // TODO: once <TextField> exists and produces FieldStateContext, extend this to the standard
    // cascade `local ?? parentFieldCtx.required ?? false`, mirroring CheckboxState.finalRequired.
    return this.#required() ?? false;
  }

  get finalVariant(): InputGroupVariant {
    return this.#variant() ?? "default";
  }

  get finalSize(): InputGroupSize {
    return this.#size() ?? "md";
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    invalid: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    variant: () => InputGroupVariant | undefined;
    size: () => InputGroupSize | undefined;
    id: () => string;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#variant = props.variant;
    this.#size = props.size;
    this.#id = props.id;
  }
}

export type InputGroupStateInstance = InstanceType<typeof InputGroupState>;
