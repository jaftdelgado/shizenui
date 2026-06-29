import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { ToggleVariants } from "@shizen-ui/styles";

export type { ToggleVariants };

export type ToggleSize = NonNullable<ToggleVariants["size"]>;
export type ToggleVariant = NonNullable<ToggleVariants["variant"]>;

export type IconContent = Snippet<[]> | string;

type ToggleBaseProps = Omit<HTMLButtonAttributes, "children" | "disabled" | "type">;

interface NormalToggleProps extends ToggleBaseProps {
  iconOnly?: false;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  ref?: HTMLButtonElement | null;
  children?: Snippet;
  startContent?: IconContent;
  endContent?: IconContent;
}

interface IconOnlyToggleProps extends ToggleBaseProps {
  iconOnly: true;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  ref?: HTMLButtonElement | null;
  children: Snippet;
  startContent?: never;
  endContent?: never;
}

export type ToggleProps = NormalToggleProps | IconOnlyToggleProps;
