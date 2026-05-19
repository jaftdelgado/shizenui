import type { HTMLInputAttributes, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SwitchSize } from "./switch.context.js";

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
>;

export interface SwitchProps extends SwitchBaseProps {
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  value?: string;
  id?: string;
  size?: SwitchSize;
  onCheckedChange?: (checked: boolean) => void;
  onclick?: (e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  children?: Snippet;
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
