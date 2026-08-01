import { useFieldStateContext } from "../../../lib/index.js";
import { useTextFieldContext } from "../../text-field/_internal/text-field.context.js";
import type { FieldStateContextResult } from "../../../lib/index.js";
import type { InputSize, InputVariant } from "./input.types.js";
import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";

export class InputState {
  #disabled: () => boolean | undefined;
  #readonly: () => boolean | undefined;
  #required: () => boolean | undefined;
  #invalid: () => boolean | undefined;
  #variant: () => InputVariant | undefined;
  #size: () => InputSize | undefined;
  #id: () => string;

  readonly fieldCtx: FieldStateContextResult;
  readonly textFieldCtx: TextFieldContextResult;

  // Intentional asymmetry vs. the standard `local ?? group ?? field ?? default`
  // cascade (see architecture doc, section 6): when Input is used inside a
  // <TextField> (fieldCtx.exists), the field is the single source of truth —
  // the local prop is not read at all, not even combined. This differs from
  // Checkbox, where a defined local value always wins. Do not "fix" this to
  // match Checkbox without re-confirming the TextField ownership model.
  get finalDisabled(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.disabled : (this.#disabled() ?? false);
  }

  get finalReadonly(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.readonly : (this.#readonly() ?? false);
  }

  get finalRequired(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.required : (this.#required() ?? false);
  }

  get finalInvalid(): boolean {
    return this.fieldCtx.exists ? this.fieldCtx.invalid : (this.#invalid() ?? false);
  }

  get finalVariant(): InputVariant {
    return this.textFieldCtx.exists ? this.textFieldCtx.variant : (this.#variant() ?? "default");
  }

  get finalSize(): InputSize {
    return this.textFieldCtx.exists ? this.textFieldCtx.size : (this.#size() ?? "md");
  }

  get id(): string {
    return this.#id();
  }

  get finalId(): string {
    return this.fieldCtx.exists ? (this.fieldCtx.inputId ?? this.#id()) : this.#id();
  }

  constructor(props: {
    disabled: () => boolean | undefined;
    readonly: () => boolean | undefined;
    required: () => boolean | undefined;
    invalid: () => boolean | undefined;
    variant: () => InputVariant | undefined;
    size: () => InputSize | undefined;
    id: () => string;
    fieldContext?: FieldStateContextResult;
    textFieldContext?: TextFieldContextResult;
  }) {
    this.#disabled = props.disabled;
    this.#readonly = props.readonly;
    this.#required = props.required;
    this.#invalid = props.invalid;
    this.#variant = props.variant;
    this.#size = props.size;
    this.#id = props.id;

    this.fieldCtx = props.fieldContext ?? useFieldStateContext();
    this.textFieldCtx = props.textFieldContext ?? useTextFieldContext();
  }
}

export type InputStateInstance = InstanceType<typeof InputState>;

/**
 * Resolves aria-describedby / aria-errormessage for Input.
 *
 * Deviation from the legacy component, noted explicitly: the legacy version
 * reconstructed `${fieldContext.id}-description` / `-error` by hand. This
 * reads `fieldCtx.descriptionId` / `fieldCtx.errorId` directly instead —
 * FieldStateContext already exposes those ids (computed by whoever produces
 * the context, e.g. TextField), so Input shouldn't re-derive the naming
 * convention itself. Same principle as Checkbox reading ids off its own
 * context in section 3.3, applied here to an externally-produced context.
 *
 * Precedence matches the legacy behavior: error message wins over
 * description when the field is invalid, description otherwise.
 */
export function resolveInputDescribedBy(
  ctx: FieldStateContextResult,
  finalInvalid: boolean,
  slots?: { hasDescription: boolean; hasError: boolean }
): { describedBy: string | undefined; errorMessageId: string | undefined } {
  if (!ctx.exists) {
    return { describedBy: undefined, errorMessageId: undefined };
  }

  return {
    describedBy: !finalInvalid && (!slots || slots.hasDescription) ? ctx.descriptionId : undefined,
    errorMessageId: finalInvalid && (!slots || slots.hasError) ? ctx.errorId : undefined
  };
}
