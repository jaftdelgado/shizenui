import type { HTMLInputAttributes, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

type RadioBaseProps = Omit<
  HTMLInputAttributes,
  | "checked"
  | "type"
  | "value"
  | "disabled"
  | "name"
  | "id"
  | "onclick"
  | "onchange"
  | "onkeydown"
  | "onkeyup"
  | "onfocus"
  | "onblur"
  | "children"
>;

export type RadioClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLDivElement };

export interface RadioProps extends RadioBaseProps {
  value: string;
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  id?: string;
  ref?: HTMLInputElement | null;
  onCheckedChange?: (checked: boolean) => void;
  onclick?: (e: RadioClickEvent) => void;
  children: Snippet;
}

export interface RadioControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}

export interface RadioContentProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  ref?: HTMLDivElement | null;
}

export interface RadioIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}
