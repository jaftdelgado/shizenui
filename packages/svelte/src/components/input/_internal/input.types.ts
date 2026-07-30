import type { HTMLInputAttributes } from "svelte/elements";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "secondary" | "outline";

type InputBaseProps = Omit<HTMLInputAttributes, "size" | "oninput" | "oninvalid">;

export type InputInputEvent = InputEvent & { currentTarget: HTMLInputElement };
export type InputInvalidEvent = Event & { currentTarget: HTMLInputElement };

export interface InputProps extends InputBaseProps {
  size?: InputSize;
  variant?: InputVariant;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  id?: string;
  ref?: HTMLInputElement | null;
  oninput?: (event: InputInputEvent) => void;
  oninvalid?: (event: InputInvalidEvent) => void;
}
