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
  | "name"
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
  readonly?: boolean;
  name?: string;
  value?: string;
  id?: string;
  size?: SwitchSize;
  onCheckedChange?: (checked: boolean) => void;
  children?: Snippet<[SwitchRenderState]>;
}

export interface SwitchRenderState {
  isChecked: boolean;
  isDisabled: boolean;
  isReadonly: boolean;
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
