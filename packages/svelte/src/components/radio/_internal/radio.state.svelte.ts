import { radioStyles } from "@shizen-ui/styles";
import { setRadioContext } from "../../../contexts/internal/index.js";
import { useRadioGroupContext } from "../../../contexts/internal/index.js";
import { setFieldStateContext, useFieldStateContext } from "../../../contexts/index.js";

export class RadioState {
  #disabled: () => boolean;
  #invalid: () => boolean;
  #name: () => string | undefined;
  #id: () => string;
  #checked: () => boolean;
  #value: () => string;

  readonly groupCtx: ReturnType<typeof useRadioGroupContext>;
  readonly #parentFieldCtx: ReturnType<typeof useFieldStateContext>;

  get finalDisabled(): boolean {
    if (this.#parentFieldCtx.exists) return this.#parentFieldCtx.disabled;
    if (this.groupCtx.exists) return this.groupCtx.disabled;
    return this.#disabled();
  }

  get finalInvalid(): boolean {
    if (this.#parentFieldCtx.exists) return this.#parentFieldCtx.invalid;
    if (this.groupCtx.exists) return this.groupCtx.invalid;
    return this.#invalid();
  }

  get activeName(): string | undefined {
    return this.groupCtx.exists ? this.groupCtx.name : this.#name();
  }

  get isChecked(): boolean {
    return this.groupCtx.exists ? this.groupCtx.value === this.#value() : this.#checked();
  }

  get styles() {
    return radioStyles();
  }

  get value(): string {
    return this.#value();
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    value: () => string;
    disabled: () => boolean;
    invalid: () => boolean;
    name: () => string | undefined;
    id: () => string;
    checked: () => boolean;
  }) {
    this.#value = props.value;
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#name = props.name;
    this.#id = props.id;
    this.#checked = props.checked;

    this.groupCtx = useRadioGroupContext();
    this.#parentFieldCtx = useFieldStateContext();

    const self = this;

    setRadioContext({
      get checked() {
        return self.isChecked;
      },
      get disabled() {
        return self.finalDisabled;
      },
      get invalid() {
        return self.finalInvalid;
      },
      get id() {
        return self.#id();
      }
    });

    setFieldStateContext({
      get invalid() {
        return self.finalInvalid;
      },
      get disabled() {
        return self.finalDisabled;
      },
      get required() {
        return false;
      },
      get id() {
        return self.#id();
      },
      get keepDescription() {
        return true;
      }
    });
  }
}

export type RadioStateInstance = InstanceType<typeof RadioState>;
