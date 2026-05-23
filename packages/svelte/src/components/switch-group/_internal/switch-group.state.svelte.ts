import type { SwitchSize } from "../../switch/_internal/index.js";
import type { SwitchGroupOrientation } from "./switch-group.context.js";

export class SwitchGroupState {
  #disabled: () => boolean;
  #readonly: () => boolean;
  #size: () => SwitchSize;
  #orientation: () => SwitchGroupOrientation;

  get finalDisabled(): boolean {
    return this.#disabled();
  }

  get finalReadonly(): boolean {
    return this.#readonly();
  }

  get finalSize(): SwitchSize {
    return this.#size();
  }

  get finalOrientation(): SwitchGroupOrientation {
    return this.#orientation();
  }

  constructor(props: {
    disabled: () => boolean;
    readonly: () => boolean;
    size: () => SwitchSize;
    orientation: () => SwitchGroupOrientation;
  }) {
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#size = props.size;
    this.#orientation = props.orientation;
  }
}
