import type { HTMLButtonAttributes, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

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
  | "onfocus"
  | "onblur"
  | "children"
>;

export type RadioClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

export interface RadioProps extends RadioBaseProps {
  value: string;
  disabled?: boolean;
  id?: string;
  ref?: HTMLButtonElement | null;
  onclick?: (e: RadioClickEvent) => void;
  children?: Snippet;
}

export interface RadioControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}

export interface RadioContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}

export interface RadioIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
  ref?: HTMLSpanElement | null;
}
