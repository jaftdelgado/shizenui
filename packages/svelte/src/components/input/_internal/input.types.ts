import type { HTMLInputAttributes } from "svelte/elements";
import type {
  TextFieldControlType,
  TextFieldControlValue
} from "../../text-field/_internal/text-field.types.js";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "secondary" | "outline";

type InputBaseProps = Omit<
  HTMLInputAttributes,
  "size" | "type" | "value" | "oninput" | "oninvalid"
>;

export type InputInputEvent = InputEvent & { currentTarget: HTMLInputElement };
export type InputInvalidEvent = Event & { currentTarget: HTMLInputElement };

export interface InputProps extends InputBaseProps {
  /**
   * Inside TextField, state and style props are parent-first: the TextField
   * context wins over local values.
   */
  size?: InputSize;
  variant?: InputVariant;
  /** The public binding is normalized to a string before it reaches state. */
  value?: TextFieldControlValue;
  type?: TextFieldControlType;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  id?: string;
  ref?: HTMLInputElement | null;
  oninput?: (event: InputInputEvent) => void;
  oninvalid?: (event: InputInvalidEvent) => void;
}
