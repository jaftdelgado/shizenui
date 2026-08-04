import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type TextFieldSize = "sm" | "md" | "lg";
export type TextFieldVariant = "default" | "secondary" | "outline";

export type TextFieldControlType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";

export type TextFieldControlValue = string | number | null | undefined;

const TEXT_FIELD_CONTROL_TYPES: readonly TextFieldControlType[] = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
  "number"
];

export function isTextFieldControlType(value: unknown): value is TextFieldControlType {
  return (
    typeof value === "string" && TEXT_FIELD_CONTROL_TYPES.includes(value as TextFieldControlType)
  );
}

export function resolveTextFieldControlType(value: unknown): TextFieldControlType {
  return isTextFieldControlType(value) ? value : "text";
}

export function normalizeTextFieldControlValue(value: TextFieldControlValue): string {
  return value == null ? "" : String(value);
}

type TextFieldBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "id">;

export interface TextFieldProps extends TextFieldBaseProps {
  children?: Snippet;
  value?: string;
  size?: TextFieldSize;
  variant?: TextFieldVariant;
  disabled?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  required?: boolean;
  id?: string;
  ref?: HTMLDivElement | null;
}
