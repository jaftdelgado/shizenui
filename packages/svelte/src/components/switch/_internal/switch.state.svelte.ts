import { useSwitchGroupContext } from "../../switch-group/_internal/switch-group.context.js";
import type { SwitchGroupContextResult } from "../../switch-group/_internal/switch-group.context.js";
import {
  useFieldStateContext,
  type FieldStateContextResult
} from "../../../lib/index.js";
import type { SwitchSize } from "./switch.types.js";

export class SwitchState {
  #disabled: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #size: () => SwitchSize;

  #parentFieldContext: FieldStateContextResult;
  #groupCtx: SwitchGroupContextResult;

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
    groupContext?: SwitchGroupContextResult;
    fieldContext?: FieldStateContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#size = props.size;
    this.#groupCtx = props.groupContext ?? useSwitchGroupContext();
    this.#parentFieldContext = props.fieldContext ?? useFieldStateContext();
  }
}
