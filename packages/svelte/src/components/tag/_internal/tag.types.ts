import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type TagVariant = "default" | "secondary";
export type TagSize = "sm" | "md" | "lg";

type TagBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "id"
  | "role"
  | "tabindex"
  | "children"
  | "onclick"
  | "onkeydown"
  | "onkeyup"
  | "onmousedown"
  | "onmouseup"
  | "onmouseleave"
  | "onfocus"
  | "onblur"
>;

export type TagClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLDivElement };

export interface TagProps extends TagBaseProps {
  value: string;
  textValue?: string;
  disabled?: boolean;
  id?: string;
  ref?: HTMLDivElement | null;
  onclick?: (e: TagClickEvent) => void;
  onRemove?: () => void;
  children?: Snippet;
}

type TagRemoveButtonBaseProps = Omit<
  HTMLButtonAttributes,
  "type" | "tabindex" | "children" | "onclick" | "onmousedown"
>;

export interface TagRemoveButtonProps extends TagRemoveButtonBaseProps {
  children?: Snippet;
  ref?: HTMLButtonElement | null;
}
