import { setRadioGroupContext } from "../../../contexts/internal/index.js";
import { setFieldStateContext } from "../../../contexts/index.js";
import type { RadioGroupProps } from "./radio-group.types.js";

export class RadioGroupState {
  #value: () => RadioGroupProps["value"];
  #name: () => string;
  #disabled: () => boolean;
  #invalid: () => boolean;
  #required: () => boolean;
  #orientation: () => NonNullable<RadioGroupProps["orientation"]>;
  #id: () => string;
  #setValue: (v: string) => void;

  constructor(props: {
    value: () => RadioGroupProps["value"];
    name: () => string;
    disabled: () => boolean;
    invalid: () => boolean;
    required: () => boolean;
    orientation: () => NonNullable<RadioGroupProps["orientation"]>;
    id: () => string;
    setValue: (v: string) => void;
  }) {
    this.#value = props.value;
    this.#name = props.name;
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#required = props.required;
    this.#orientation = props.orientation;
    this.#id = props.id;
    this.#setValue = props.setValue;

    const self = this;

    setFieldStateContext({
      get invalid() {
        return self.#invalid();
      },
      get disabled() {
        return self.#disabled();
      },
      get required() {
        return self.#required();
      },
      get id() {
        return self.#id();
      },
      get keepDescription() {
        return false;
      }
    });

    setRadioGroupContext({
      get value() {
        return self.#value();
      },
      get name() {
        return self.#name();
      },
      get disabled() {
        return self.#disabled();
      },
      get invalid() {
        return self.#invalid();
      },
      get orientation() {
        return self.#orientation();
      },
      setValue(v) {
        self.#setValue(v);
      }
    });
  }
}
