import type { ButtonVariant, ButtonSize } from "./button.types.js";

export class ButtonState {
  #variant: () => ButtonVariant | undefined;
  #size: () => ButtonSize | undefined;
  #disabled: () => boolean | undefined;
  #loading: () => boolean;

  get finalVariant(): ButtonVariant {
    return this.#variant() ?? "primary";
  }

  get finalSize(): ButtonSize {
    return this.#size() ?? "md";
  }

  get finalDisabled(): boolean {
    return (this.#disabled() ?? false) || this.#loading();
  }

  constructor(props: {
    variant: () => ButtonVariant | undefined;
    size: () => ButtonSize | undefined;
    disabled: () => boolean | undefined;
    loading: () => boolean;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#loading = props.loading;
  }
}
