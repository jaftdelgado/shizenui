import type { SwitchSize } from "../../switch/_internal/index.js";
import type { SwitchGroupOrientation } from "./switch-group.types.js";

export class SwitchGroupState {
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #size: () => SwitchSize;
  #orientation: () => SwitchGroupOrientation;

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalReadonly(): boolean {
    return this.#readonly() ?? false;
  }

  get finalSize(): SwitchSize {
    return this.#size();
  }

  get finalOrientation(): SwitchGroupOrientation {
    return this.#orientation();
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    size: () => SwitchSize;
    orientation: () => SwitchGroupOrientation;
  }) {
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#size = props.size;
    this.#orientation = props.orientation;
  }
}
