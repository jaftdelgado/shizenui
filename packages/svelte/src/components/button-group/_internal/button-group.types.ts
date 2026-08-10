import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ButtonSize, ButtonVariant } from "../../button/_internal/button.types.js";

type ButtonGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends ButtonGroupBaseProps {
  children?: Snippet;
  ref?: HTMLDivElement | null;
  variant?: ButtonVariant;
  size?: ButtonSize;
  orientation?: ButtonGroupOrientation;
  hideSeparator?: boolean;
  disabled?: boolean;
}
