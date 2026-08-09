import type { ToggleVariant, ToggleSize } from "./toggle.types.js";
import { useToggleGroupContext } from "../../toggle-group/_internal/index.js";
import type { ToggleGroupContextResult } from "../../toggle-group/_internal/index.js";

export class ToggleState {
  #variant: () => ToggleVariant | undefined;
  #size: () => ToggleSize | undefined;
  #disabled: () => boolean | undefined;
  #value: () => string | undefined;
  #id: () => string;
  #pressed: () => boolean;
  #setPressed: (value: boolean) => void;
  #onPressedChange?: (value: boolean) => void;
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

  get groupCtx(): ToggleGroupContextResult {
    return this.#groupCtx;
  }

  get id(): string {
    return this.#id();
  }

  get finalPressed(): boolean {
    if (this.#groupCtx.exists) {
      const value = this.#value();
      return value ? this.#groupCtx.isSelected(value) : false;
    }

    return this.#pressed();
  }

  toggle(value?: string): void {
    if (this.finalDisabled) return;

    if (this.#groupCtx.exists) {
      if (value) {
        this.#groupCtx.onToggle(value);
      }
      return;
    }

    const next = !this.#pressed();
    this.#setPressed(next);
    this.#onPressedChange?.(next);
  }

  constructor(props: {
    variant: () => ToggleVariant | undefined;
    size: () => ToggleSize | undefined;
    disabled: () => boolean | undefined;
    value: () => string | undefined;
    id: () => string;
    getPressed: () => boolean;
    setPressed: (value: boolean) => void;
    onPressedChange?: (value: boolean) => void;
    groupContext?: ToggleGroupContextResult;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#disabled = props.disabled;
    this.#value = props.value;
    this.#id = props.id;
    this.#pressed = props.getPressed;
    this.#setPressed = props.setPressed;
    this.#onPressedChange = props.onPressedChange;
    this.#groupCtx = props.groupContext ?? useToggleGroupContext();
  }
}

export type ToggleStateInstance = InstanceType<typeof ToggleState>;
