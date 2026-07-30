import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

type TextFieldBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "id">;

export interface TextFieldProps extends TextFieldBaseProps {
  children?: Snippet;
  value?: string;
  disabled?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** The id assigned to the native control, not the wrapper element. */
  id?: string;
  ref?: HTMLDivElement | null;
}
