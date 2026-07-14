import type { HTMLButtonAttributes, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

type CheckboxBaseProps = Omit<
  HTMLButtonAttributes,
  | "checked"
  | "type"
  | "value"
  | "disabled"
  | "id"
  | "onclick"
  | "onkeydown"
  | "onkeyup"
  | "onfocus"
  | "onblur"
  | "children"
>;

export type CheckboxClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

export interface CheckboxProps extends CheckboxBaseProps {
  value?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  required?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onIndeterminateChange?: (indeterminate: boolean) => void;
  id?: string;
  ref?: HTMLButtonElement | null;
  onclick?: (e: CheckboxClickEvent) => void;
  children?: Snippet;
}

export interface CheckboxControlProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}

export interface CheckboxContentProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}

export interface CheckboxIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}
