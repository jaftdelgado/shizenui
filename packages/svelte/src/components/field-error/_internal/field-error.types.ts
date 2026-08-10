import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

type FieldErrorBaseProps = Omit<HTMLAttributes<HTMLSpanElement>, "children" | "id" | "role">;

export interface FieldErrorProps extends FieldErrorBaseProps {
  children?: Snippet;
  invalid?: boolean;
  id?: string;
  ref?: HTMLSpanElement | null;
}
