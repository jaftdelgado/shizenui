import type { ToggleVariant, ToggleSize } from "./toggle.types.js";
import { useToggleGroupContext } from "../../toggle-group/_internal/index.js";
import type { ToggleGroupContextResult } from "../../toggle-group/_internal/index.js";

export class ToggleState {
  #variant: () => ToggleVariant | undefined;
  #size: () => ToggleSize | undefined;
  #disabled: () => boolean | undefined;
  #groupCtx: ToggleGroupContextResult;

  get finalVariant(): ToggleVariant {
    return this.#groupCtx.exists ? this.#groupCtx.variant : (this.#variant() ?? "default");
  }

  get finalSize(): ToggleSize {
    return this.#groupCtx.exists ? this.#groupCtx.size : (this.#size() ?? "md");
  }

  get finalDisabled(): boolean {
    const localDisabled = this.#disabled();
    const groupDisabled = this.#groupCtx.exists ? this.#groupCtx.disabled : false;
    return localDisabled ?? groupDisabled;
  }

  constructor(props: {
    variant: () => ToggleVariant | undefined;
    size: () => ToggleSize | undefined;
    disabled: () => boolean | undefined;
    groupContext?: ToggleGroupContextResult;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#groupCtx = props.groupContext ?? useToggleGroupContext();
  }
}
