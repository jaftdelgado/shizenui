import type { ToggleVariant, ToggleSize } from "./toggle.types.js";

export class ToggleState {
  #variant: () => ToggleVariant | undefined;
  #size: () => ToggleSize | undefined;
  #disabled: () => boolean | undefined;

  get finalVariant(): ToggleVariant {
    return this.#variant() ?? "default";
  }

  get finalSize(): ToggleSize {
    return this.#size() ?? "md";
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  constructor(props: {
    variant: () => ToggleVariant | undefined;
    size: () => ToggleSize | undefined;
    disabled: () => boolean | undefined;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;

    // TODO: integrate ToggleGroupContext
  }
}
