import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type ToggleSize = "sm" | "md" | "lg";
export type ToggleVariant = "default" | "outline" | "ghost";

export type ToggleIconContent = Snippet<[]>;

export type ToggleClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

type ToggleBaseProps = Omit<
  HTMLButtonAttributes,
  "children" | "disabled" | "type" | "onclick" | "onkeydown" | "onkeyup" | "onblur" | "onfocus"
>;

interface ToggleNormalProps extends ToggleBaseProps {
  iconOnly?: false;
  variant?: ToggleVariant;
  size?: ToggleSize;
  id?: string;
  disabled?: boolean;
  value?: string;
  pressed?: boolean;
  onclick?: (event: ToggleClickEvent) => void;
  onPressedChange?: (pressed: boolean) => void;
  ref?: HTMLButtonElement | null;
  children?: Snippet;
  startContent?: ToggleIconContent;
  endContent?: ToggleIconContent;
}

interface ToggleIconOnlyProps extends ToggleBaseProps {
  iconOnly: true;
  variant?: ToggleVariant;
  size?: ToggleSize;
  id?: string;
  disabled?: boolean;
  value?: string;
  pressed?: boolean;
  onclick?: (event: ToggleClickEvent) => void;
  onPressedChange?: (pressed: boolean) => void;
  ref?: HTMLButtonElement | null;
  children: Snippet;
  startContent?: never;
  endContent?: never;
}

export type ToggleProps = ToggleNormalProps | ToggleIconOnlyProps;
