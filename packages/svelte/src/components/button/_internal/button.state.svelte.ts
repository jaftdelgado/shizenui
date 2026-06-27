import type { ButtonVariant, ButtonSize } from "./button.types.js";
import { useButtonGroupContext } from "../../button-group/_internal/index.js";
import type { ButtonGroupContextResult } from "../../button-group/_internal/index.js";

export class ButtonState {
  #variant: () => ButtonVariant | undefined;
  #size: () => ButtonSize | undefined;
  #disabled: () => boolean | undefined;
  #loading: () => boolean;
  #groupCtx: ButtonGroupContextResult;

  get finalVariant(): ButtonVariant {
    return this.#groupCtx.exists ? this.#groupCtx.variant : (this.#variant() ?? "primary");
  }

  get finalSize(): ButtonSize {
    return this.#groupCtx.exists ? this.#groupCtx.size : (this.#size() ?? "md");
  }

  get finalDisabled(): boolean {
    const localDisabled = this.#disabled();
    const groupDisabled = this.#groupCtx.exists ? this.#groupCtx.disabled : false;

    return (localDisabled ?? groupDisabled) || this.#loading();
  }

  constructor(props: {
    variant: () => ButtonVariant | undefined;
    size: () => ButtonSize | undefined;
    disabled: () => boolean | undefined;
    loading: () => boolean;
    groupContext?: ButtonGroupContextResult;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#loading = props.loading;
    this.#groupCtx = props.groupContext ?? useButtonGroupContext();
  }
}
