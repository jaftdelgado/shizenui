import type { ButtonSize, ButtonVariant } from "../../button/_internal/button.types.js";
import type { ButtonGroupOrientation } from "./button-group.types.js";

export class ButtonGroupState {
  #variant: () => ButtonVariant;
  #size: () => ButtonSize;
  #disabled: () => boolean | undefined;
  #orientation: () => ButtonGroupOrientation;
  #hideSeparator: () => boolean;

  get finalVariant(): ButtonVariant {
    return this.#variant();
  }

  get finalSize(): ButtonSize {
    return this.#size();
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalOrientation(): ButtonGroupOrientation {
    return this.#orientation();
  }

  get finalHideSeparator(): boolean {
    return this.#hideSeparator();
  }

  constructor(props: {
    variant: () => ButtonVariant;
    size: () => ButtonSize;
    disabled: () => boolean | undefined;
    orientation: () => ButtonGroupOrientation;
    hideSeparator: () => boolean;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#orientation = props.orientation;
    this.#hideSeparator = props.hideSeparator;
  }
}
