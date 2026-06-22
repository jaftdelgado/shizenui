import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ButtonVariants } from "@shizen-ui/styles";

type ButtonGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends ButtonGroupBaseProps {
  children: Snippet;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  orientation?: ButtonGroupOrientation;
  hideSeparator?: boolean;
  disabled?: boolean;
}
