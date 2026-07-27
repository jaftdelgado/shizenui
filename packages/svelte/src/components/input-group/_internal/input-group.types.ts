import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";

export type InputGroupVariant = "default" | "secondary" | "outline";
export type InputGroupSize = "sm" | "md" | "lg";
export type InputGroupKind = "input" | "textarea";

type InputGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export interface InputGroupProps extends InputGroupBaseProps {
  children?: Snippet;
  disabled?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  required?: boolean;
  variant?: InputGroupVariant;
  size?: InputGroupSize;
  id?: string;
  ref?: HTMLDivElement | null;
}

export interface InputGroupPrefixProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}

export interface InputGroupSuffixProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}

// No DOM events are omitted here because InputGroup.Input does not install internal event handlers.
type InputGroupInputBaseProps = Omit<
  HTMLInputAttributes,
  "disabled" | "readonly" | "required" | "id" | "children"
>;

export interface InputGroupInputProps extends InputGroupInputBaseProps {
  id?: string;
  ref?: HTMLInputElement | null;
}

// No DOM events are omitted here because InputGroup.TextArea does not install internal event handlers.
type InputGroupTextAreaBaseProps = Omit<
  HTMLTextareaAttributes,
  "disabled" | "readonly" | "required" | "id" | "children"
>;

export interface InputGroupTextAreaProps extends InputGroupTextAreaBaseProps {
  id?: string;
  ref?: HTMLTextAreaElement | null;
}
