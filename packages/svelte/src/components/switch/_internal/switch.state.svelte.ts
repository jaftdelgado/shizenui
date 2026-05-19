import { setSwitchContext } from "./switch.context.js";
import { useSwitchGroupContext } from "../../switch-group/_internal/switch-group.context.js";
import { setFieldStateContext, useFieldStateContext } from "../../../lib/index.js";
import type { SwitchSize } from "./switch.types.js";

export class SwitchState {
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #size: () => SwitchSize;
  #id: () => string;

  #parentFieldContext = useFieldStateContext();
  #groupCtx = useSwitchGroupContext();

  get finalDisabled(): boolean {
    const local = this.#disabled();
    if (local !== undefined) return local;
    return this.#groupCtx.exists
      ? this.#groupCtx.disabled
      : this.#parentFieldContext.exists
        ? this.#parentFieldContext.disabled
        : false;
  }

  get finalInvalid(): boolean {
    const local = this.#invalid();
    if (local !== undefined) return local;
    return this.#groupCtx.exists
      ? this.#groupCtx.invalid
      : this.#parentFieldContext.exists
        ? this.#parentFieldContext.invalid
        : false;
  }

  get finalSize(): SwitchSize {
    return this.#groupCtx.exists ? this.#groupCtx.size : this.#size();
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    invalid: () => boolean | undefined;
    size: () => SwitchSize;
    id: () => string;
    checked: () => boolean;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#size = props.size;
    this.#id = props.id;

    const self = this;

    setSwitchContext({
      get checked() {
        return props.checked();
      },
      get disabled() {
        return self.finalDisabled;
      },
      get invalid() {
        return self.finalInvalid;
      },
      get id() {
        return self.#id();
      },
      get size() {
        return self.finalSize;
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
