import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

type LabelBaseProps = Omit<HTMLAttributes<HTMLElement>, "children" | "id" | "for">;

export interface LabelProps extends LabelBaseProps {
  children?: Snippet;
  id?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  for?: string;
  ref?: HTMLLabelElement | HTMLSpanElement | null;
}
