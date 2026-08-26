import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type AlertStatus = "default" | "accent" | "success" | "warning" | "danger";
export type AlertVariant = "default" | "secondary" | "outline";

type AlertBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "ref" | "role" | "aria-labelledby" | "aria-describedby"
>;

export interface AlertProps extends AlertBaseProps {
  status?: AlertStatus;
  variant?: AlertVariant;
  id?: string;
  ref?: HTMLDivElement | null;
  children?: Snippet;
}

type AlertCompoundBaseProps<E extends HTMLElement> = Omit<
  HTMLAttributes<E>,
  "children" | "ref"
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
