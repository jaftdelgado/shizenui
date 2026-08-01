import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type TextFieldSize = "sm" | "md" | "lg";
export type TextFieldVariant = "default" | "secondary" | "outline";

type TextFieldBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "id">;

export interface TextFieldProps extends TextFieldBaseProps {
  children?: Snippet;
  value?: string;
  size?: TextFieldSize;
  variant?: TextFieldVariant;
  disabled?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** The id assigned to the native control, not the wrapper element. */
  id?: string;
  ref?: HTMLDivElement | null;
}
