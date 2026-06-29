import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";
import type { ToggleGroupOrientation } from "./toggle-group.types.js";

export class ToggleGroupState {
  #variant: () => ToggleVariant;
  #size: () => ToggleSize;
  #disabled: () => boolean | undefined;
  #orientation: () => ToggleGroupOrientation;
  #hideSeparator: () => boolean;

  get finalVariant(): ToggleVariant {
    return this.#variant();
  }

  get finalSize(): ToggleSize {
    return this.#size();
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalOrientation(): ToggleGroupOrientation {
    return this.#orientation();
  }

  get finalHideSeparator(): boolean {
    return this.#hideSeparator();
  }

  constructor(props: {
    variant: () => ToggleVariant;
    size: () => ToggleSize;
    disabled: () => boolean | undefined;
    orientation: () => ToggleGroupOrientation;
    hideSeparator: () => boolean;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#orientation = props.orientation;
    this.#hideSeparator = props.hideSeparator;
  }
}
