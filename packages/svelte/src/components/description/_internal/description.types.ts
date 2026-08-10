import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

type DescriptionBaseProps = Omit<HTMLAttributes<HTMLSpanElement>, "children" | "id">;

export interface DescriptionProps extends DescriptionBaseProps {
  children?: Snippet;
  disabled?: boolean;
  id?: string;
  ref?: HTMLSpanElement | null;
}
