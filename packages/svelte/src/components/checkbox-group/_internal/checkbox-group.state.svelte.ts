import type { CheckboxGroupOrientation, CheckboxGroupProps } from "./checkbox-group.types.js";
import type { CheckboxGroupContextResult } from "./checkbox-group.context.js";
import { useSurfaceContext } from "../../../lib/index.js";
import type { SurfaceContextResult } from "../../../lib/contexts/surface.context.js";

export class CheckboxGroupState {
  #value: () => CheckboxGroupProps["value"];
  #onValueChange: () => ((value: string[]) => void) | undefined;
  #name: () => string | undefined;
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #submissionInvalid: () => boolean;
  #required: () => boolean | undefined;
  #orientation: () => CheckboxGroupOrientation | undefined;
  #variant: () => CheckboxGroupProps["variant"];
  #id: () => string;
  #setValue: (value: string[]) => void;
  #selectedSet = $derived(new Set(this.finalValue));
  readonly surfaceCtx: SurfaceContextResult;

  get finalValue(): string[] {
    return this.#value() ?? [];
  }

  get finalName(): string | undefined {
    return this.#name();
  }

  get finalDisabled(): boolean {
    return this.#disabled() ?? false;
  }

  get finalReadonly(): boolean {
    return this.#readonly() ?? false;
  }

  get finalInvalid(): boolean {
    const local = this.#invalid();
    return (local ?? false) || this.#submissionInvalid();
  }

  get finalRequired(): boolean {
    return this.#required() ?? false;
  }

  get finalOrientation(): CheckboxGroupOrientation {
    return this.#orientation() ?? "vertical";
  }

  get finalVariant(): NonNullable<CheckboxGroupProps["variant"]> {
    return this.#variant() ?? (this.surfaceCtx.exists ? "secondary" : "default");
  }

  get id(): string {
    return this.#id();
  }

  isSelected(value: string): boolean {
    return this.#selectedSet.has(value);
  }

  toggleValue(value: string): void {
    const current = this.finalValue;
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

    this.#setValue(next);
    this.#onValueChange()?.(next);
  }

  constructor(props: {
    value: () => CheckboxGroupProps["value"];
    onValueChange: () => ((value: string[]) => void) | undefined;
    name: () => string | undefined;
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    invalid: () => boolean | undefined;
    submissionInvalid: () => boolean;
    required: () => boolean | undefined;
    orientation: () => CheckboxGroupOrientation | undefined;
    variant: () => CheckboxGroupProps["variant"];
    id: () => string;
    setValue: (value: string[]) => void;
    surfaceContext?: SurfaceContextResult;
  }) {
    this.#value = props.value;
    this.#onValueChange = props.onValueChange;
    this.#name = props.name;
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#invalid = props.invalid;
    this.#submissionInvalid = props.submissionInvalid;
    this.#required = props.required;
    this.#orientation = props.orientation;
    this.#variant = props.variant;
    this.#id = props.id;
    this.#setValue = props.setValue;
    this.surfaceCtx = props.surfaceContext ?? useSurfaceContext();
  }
}

export type CheckboxGroupStateInstance = InstanceType<typeof CheckboxGroupState>;

export function resolveCheckboxGroupDescribedBy(
  ctx: CheckboxGroupContextResult
): string | undefined {
  return (
    [
      ctx.hasError ? ctx.errorId : null,
      !ctx.hasError && ctx.hasDescription ? ctx.descriptionId : null
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );
}
