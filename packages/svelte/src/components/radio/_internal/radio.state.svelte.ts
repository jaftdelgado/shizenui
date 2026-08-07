import { useRadioGroupContext } from "../../radio-group/_internal/radio-group.context.js";
import type { RadioGroupContextResult } from "../../radio-group/_internal/radio-group.context.js";
import type { RadioContextResult } from "./radio.context.js";
import {
  useFieldStateContext,
  useSurfaceContext,
  type FieldStateContextResult
} from "../../../lib/index.js";
import type { SurfaceContextResult } from "../../../lib/contexts/surface.context.js";
import type { RadioProps, RadioVariant } from "./radio.types.js";

export class RadioState {
  #disabled: () => boolean | undefined;
  #variant: () => RadioProps["variant"];
  #id: () => string;
  #value: () => string;

  readonly groupCtx: RadioGroupContextResult;
  readonly parentFieldCtx: FieldStateContextResult;
  readonly surfaceCtx: SurfaceContextResult;

  get finalVariant(): RadioVariant {
    if (this.groupCtx.exists) return this.groupCtx.variant;
    return this.#variant() ?? (this.surfaceCtx.exists ? "secondary" : "default");
  }

  get finalDisabled(): boolean {
    const local = this.#disabled();
    if (local !== undefined) return local;
    return this.groupCtx.exists
      ? this.groupCtx.disabled
      : this.parentFieldCtx.exists
        ? this.parentFieldCtx.disabled
        : false;
  }

  get finalReadonly(): boolean {
    return this.groupCtx.exists
      ? this.groupCtx.readonly
      : this.parentFieldCtx.exists
        ? this.parentFieldCtx.readonly
        : false;
  }

  get finalInvalid(): boolean {
    return this.groupCtx.exists
      ? this.groupCtx.invalid
      : this.parentFieldCtx.exists
        ? this.parentFieldCtx.invalid
        : false;
  }

  get isChecked(): boolean {
    return this.groupCtx.value === this.#value();
  }

  get value(): string {
    return this.#value();
  }

  get id(): string {
    return this.#id();
  }

  constructor(props: {
    value: () => string;
    disabled: () => boolean | undefined;
    variant: () => RadioProps["variant"];
    id: () => string;
    groupContext?: RadioGroupContextResult;
    fieldContext?: FieldStateContextResult;
    surfaceContext?: SurfaceContextResult;
  }) {
    this.#value = props.value;
    this.#disabled = props.disabled;
    this.#variant = props.variant;
    this.#id = props.id;

    this.groupCtx = props.groupContext ?? useRadioGroupContext();
    this.parentFieldCtx = props.fieldContext ?? useFieldStateContext();
    this.surfaceCtx = props.surfaceContext ?? useSurfaceContext();
  }
}

export type RadioStateInstance = InstanceType<typeof RadioState>;

export function resolveRadioDescribedBy(
  state: RadioStateInstance,
  ctx: RadioContextResult,
  id: string
): string | undefined {
  return (
    [
      ctx.hasDescription ? `${id}-description` : null,
      state.groupCtx.exists
        ? state.groupCtx.hasError
          ? state.groupCtx.errorId
          : state.groupCtx.hasDescription
            ? state.groupCtx.descriptionId
            : null
        : null
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );
}
