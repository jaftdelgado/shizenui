import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "ghost"
  | "outline"
  | "soft-danger";

export type ButtonIconContent = Snippet<[]>;

type ButtonBaseProps = Omit<
  HTMLButtonAttributes,
  | "children"
  | "disabled"
  | "onkeydown"
  | "onkeyup"
  | "onmousedown"
  | "onmouseup"
  | "onmouseleave"
  | "onblur"
>;

interface ButtonNormalProps extends ButtonBaseProps {
  iconOnly?: false;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  ref?: HTMLButtonElement | null;
  children?: Snippet;
  startContent?: ButtonIconContent;
  endContent?: ButtonIconContent;
}

interface ButtonIconOnlyProps extends ButtonBaseProps {
  iconOnly: true;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  ref?: HTMLButtonElement | null;
  children: Snippet;
  startContent?: never;
  endContent?: never;
}

export type ButtonProps = ButtonNormalProps | ButtonIconOnlyProps;
