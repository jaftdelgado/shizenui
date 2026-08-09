import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type SwitchSize = "sm" | "md" | "lg";

type SwitchBaseProps = Omit<
  HTMLButtonAttributes,
  | "checked"
  | "type"
  | "onclick"
  | "onkeydown"
  | "disabled"
  | "name"
  | "value"
  | "id"
  | "onkeyup"
  | "onmousedown"
  | "onmouseup"
  | "onmouseleave"
  | "onfocus"
  | "onblur"
  | "role"
  | "tabindex"
  | "children"
>;

export type SwitchClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

export interface SwitchProps extends SwitchBaseProps {
  checked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  ref?: HTMLButtonElement | null;
  size?: SwitchSize;
  onclick?: (event: SwitchClickEvent) => void;
  onCheckedChange?: (checked: boolean) => void;
  children?: Snippet<[SwitchRenderState]>;
}

export interface SwitchRenderState {
  isChecked: boolean;
  isDisabled: boolean;
  isReadonly: boolean;
  isFocusVisible: boolean;
}

export interface SwitchControlProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: HTMLSpanElement | null;
  children?: Snippet;
}

export interface SwitchThumbProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: HTMLSpanElement | null;
  children?: Snippet;
}

export interface SwitchContentProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: HTMLSpanElement | null;
  children: Snippet;
}
