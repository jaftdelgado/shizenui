import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";

export type InputGroupVariant = "default" | "secondary" | "outline";
export type InputGroupSize = "sm" | "md" | "lg";
export type InputGroupKind = "input" | "textarea";

type InputGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role" | "onclick">;

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

type InputGroupInputBaseProps = Omit<
  HTMLInputAttributes,
  "disabled" | "readonly" | "required" | "id" | "children" | "oninput" | "oninvalid"
>;

export type InputGroupInputEvent = InputEvent & { currentTarget: HTMLInputElement };
export type InputGroupInputInvalidEvent = Event & { currentTarget: HTMLInputElement };

export interface InputGroupInputProps extends InputGroupInputBaseProps {
  id?: string;
  ref?: HTMLInputElement | null;
  oninput?: (event: InputGroupInputEvent) => void;
  oninvalid?: (event: InputGroupInputInvalidEvent) => void;
}

type InputGroupTextAreaBaseProps = Omit<
  HTMLTextareaAttributes,
  "disabled" | "readonly" | "required" | "id" | "children" | "oninput" | "oninvalid"
>;

export type InputGroupTextAreaEvent = InputEvent & { currentTarget: HTMLTextAreaElement };
export type InputGroupTextAreaInvalidEvent = Event & { currentTarget: HTMLTextAreaElement };

export interface InputGroupTextAreaProps extends InputGroupTextAreaBaseProps {
  id?: string;
  ref?: HTMLTextAreaElement | null;
  oninput?: (event: InputGroupTextAreaEvent) => void;
  oninvalid?: (event: InputGroupTextAreaInvalidEvent) => void;
}
