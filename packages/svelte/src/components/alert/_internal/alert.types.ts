import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type AlertColor = "default" | "accent" | "info" | "success" | "warning" | "danger" | "error";
export type AlertSize = "sm" | "md" | "lg";

type AlertBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "class" | "ref" | "role" | "aria-labelledby" | "aria-describedby"
>;

export interface AlertProps extends AlertBaseProps {
  color?: AlertColor;
  size?: AlertSize;
  id?: string;
  ref?: HTMLDivElement | null;
  children?: Snippet;
}

type AlertCompoundBaseProps<E extends HTMLElement> = Omit<
  HTMLAttributes<E>,
  "children" | "class" | "ref"
>;

export interface AlertIndicatorProps extends AlertCompoundBaseProps<HTMLSpanElement> {
  ref?: HTMLSpanElement | null;
  children?: Snippet;
}

export interface AlertContentProps extends AlertCompoundBaseProps<HTMLDivElement> {
  ref?: HTMLDivElement | null;
  children?: Snippet;
}

export interface AlertTitleProps extends AlertCompoundBaseProps<HTMLHeadingElement> {
  id?: string;
  ref?: HTMLHeadingElement | null;
  children?: Snippet;
}

export interface AlertDescriptionProps extends AlertCompoundBaseProps<HTMLParagraphElement> {
  id?: string;
  ref?: HTMLParagraphElement | null;
  children?: Snippet;
}

export interface AlertActionsProps extends AlertCompoundBaseProps<HTMLDivElement> {
  ref?: HTMLDivElement | null;
  children?: Snippet;
}
