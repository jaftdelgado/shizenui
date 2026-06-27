import type { ButtonVariants } from "@shizen-ui/styles";
import type { ButtonGroupOrientation } from "./button-group.types.js";

export class ButtonGroupState {
  #variant: () => ButtonVariants["variant"] | undefined;
  #size: () => ButtonVariants["size"] | undefined;
  #disabled: () => boolean | undefined;
  #orientation: () => ButtonGroupOrientation | undefined;
  #hideSeparator: () => boolean | undefined;

  get finalVariant(): NonNullable<ButtonVariants["variant"]> {
    return this.#variant() ?? "primary";
  }

  get finalSize(): NonNullable<ButtonVariants["size"]> {
    return this.#size() ?? "md";
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalOrientation(): ButtonGroupOrientation {
    return this.#orientation() ?? "horizontal";
  }

  get finalHideSeparator(): boolean {
    return this.#hideSeparator() ?? false;
  }

  constructor(props: {
    variant: () => ButtonVariants["variant"] | undefined;
    size: () => ButtonVariants["size"] | undefined;
    disabled: () => boolean | undefined;
    orientation: () => ButtonGroupOrientation | undefined;
    hideSeparator: () => boolean | undefined;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#orientation = props.orientation;
    this.#hideSeparator = props.hideSeparator;
  }
}
