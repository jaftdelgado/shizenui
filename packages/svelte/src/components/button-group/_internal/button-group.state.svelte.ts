import type { ButtonVariants } from "@shizen-ui/styles";
import type { ButtonGroupOrientation } from "./button-group.types.js";

export class ButtonGroupState {
  #variant: () => NonNullable<ButtonVariants["variant"]>;
  #size: () => NonNullable<ButtonVariants["size"]>;
  #disabled: () => boolean | undefined;
  #orientation: () => ButtonGroupOrientation;
  #hideSeparator: () => boolean;

  get finalVariant(): NonNullable<ButtonVariants["variant"]> {
    return this.#variant();
  }

  get finalSize(): NonNullable<ButtonVariants["size"]> {
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
    variant: () => NonNullable<ButtonVariants["variant"]>;
    size: () => NonNullable<ButtonVariants["size"]>;
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
