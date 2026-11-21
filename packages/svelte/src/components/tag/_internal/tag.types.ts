import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type TagVariant = "default" | "secondary";
export type TagSize = "sm" | "md" | "lg";
export type TagIconContent = Snippet<[]>;

// Consumer DOM event handlers are accepted and composed after the internal ones (they do not run
// when the internal handler calls preventDefault). `onclick` is the only exception: it is an
// explicit prop with its own event type. It is not called while the tag is disabled, nor for a click
// on a focusable child of the tag (the remove button, or interactive content of the consumer).
type TagBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "id" | "role" | "tabindex" | "children" | "onclick"
>;

export type TagClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLDivElement };

export interface TagProps extends TagBaseProps {
  value: string;
  disabled?: boolean;
  id?: string;
  ref?: HTMLDivElement | null;
  onclick?: (e: TagClickEvent) => void;
  onRemove?: () => void;
  children?: Snippet;
  startContent?: TagIconContent;
  endContent?: TagIconContent;
}

// `onmousedown` is omitted because the internal handler always calls preventDefault (it keeps
// focus on the tag), so a consumer handler would never run.
type TagRemoveButtonBaseProps = Omit<
  HTMLButtonAttributes,
  "type" | "tabindex" | "children" | "onmousedown"
>;

export interface TagRemoveButtonProps extends TagRemoveButtonBaseProps {
  children?: Snippet;
  ref?: HTMLButtonElement | null;
}
