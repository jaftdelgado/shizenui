import type { HTMLTextareaAttributes } from "svelte/elements";

export type TextAreaVariant = "default" | "secondary" | "outline";

type TextAreaBaseProps = Omit<
  HTMLTextareaAttributes,
  "disabled" | "readonly" | "required" | "id" | "value" | "children" | "oninput" | "oninvalid"
>;

export type TextAreaInputEvent = InputEvent & { currentTarget: HTMLTextAreaElement };
export type TextAreaInvalidEvent = Event & { currentTarget: HTMLTextAreaElement };

export interface TextAreaProps extends TextAreaBaseProps {
  variant?: TextAreaVariant;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  id?: string;
  ref?: HTMLTextAreaElement | null;
  oninput?: (event: TextAreaInputEvent) => void;
  oninvalid?: (event: TextAreaInvalidEvent) => void;
}
