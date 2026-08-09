import type { HTMLButtonAttributes, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type RadioVariant = "default" | "secondary";

type RadioBaseProps = Omit<
  HTMLButtonAttributes,
  | "checked"
  | "type"
  | "value"
  | "disabled"
  | "id"
  | "onclick"
  | "onkeydown"
  | "onkeyup"
  | "onmousedown"
  | "onmouseup"
  | "onmouseleave"
  | "onfocus"
  | "onblur"
  | "children"
>;

export type RadioClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

export interface RadioProps extends RadioBaseProps {
  value: string;
  disabled?: boolean;
  variant?: RadioVariant;
  id?: string;
  ref?: HTMLButtonElement | null;
  onclick?: (e: RadioClickEvent) => void;
  children?: Snippet;
}

export interface RadioControlProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}

export interface RadioContentProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}

export interface RadioIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}
