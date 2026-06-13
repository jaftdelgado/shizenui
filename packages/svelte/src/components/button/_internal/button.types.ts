import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { ButtonVariants } from "@shizen-ui/styles";

export type { ButtonVariants };

export type ButtonSize = NonNullable<ButtonVariants["size"]>;
export type ButtonVariant = NonNullable<ButtonVariants["variant"]>;

export type IconContent = Snippet<[]> | string;

export interface ButtonRenderState {
  isLoading: boolean;
}

type ButtonBaseProps = Omit<HTMLButtonAttributes, "children" | "disabled">;

interface NormalButtonProps extends ButtonBaseProps {
  iconOnly?: false;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children?: Snippet<[ButtonRenderState]>;
  startContent?: IconContent;
  endContent?: IconContent;
}

interface IconOnlyButtonProps extends ButtonBaseProps {
  iconOnly: true;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: Snippet<[ButtonRenderState]>;
  startContent?: never;
  endContent?: never;
}

export type ButtonProps = NormalButtonProps | IconOnlyButtonProps;
