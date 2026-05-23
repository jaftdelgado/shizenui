import type { HTMLInputAttributes, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type SwitchSize = "sm" | "md" | "lg";

type SwitchBaseProps = Omit<
  HTMLInputAttributes,
  | "checked"
  | "size"
  | "type"
  | "role"
  | "tabindex"
  | "onclick"
  | "disabled"
  | "value"
  | "id"
  | "onchange"
  | "onkeydown"
  | "onkeyup"
  | "onfocus"
  | "onblur"
  | "children"
>;

export interface SwitchProps extends SwitchBaseProps {
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  value?: string;
  id?: string;
  size?: SwitchSize;
  onKeyDown?: (event: KeyboardEvent) => void;
  onCheckedChange?: (checked: boolean) => void;
  children?: Snippet<[SwitchRenderState]>;
}

export interface SwitchRenderState {
  isChecked: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  isFocusVisible: boolean;
}

export interface SwitchControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

export interface SwitchThumbProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

export interface SwitchContentProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
}
