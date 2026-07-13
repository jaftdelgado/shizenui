import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

export type CheckboxState = "checked" | "unchecked" | "indeterminate" | "onclick";

export interface CheckboxProps extends Omit<
  HTMLInputAttributes,
  "type" | "checked" | "indeterminate"
> {
  value?: string;
  invalid?: boolean;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onIndeterminateChange?: (indeterminate: boolean) => void;
  children: Snippet;
  name?: string;
  id?: string;

  onclick?: (e: MouseEvent) => void;
}

export interface CheckboxContext {
  readonly checked: boolean;
  readonly indeterminate: boolean;
  readonly checkboxState: CheckboxState;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface FieldStateContext {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly id: string;
  readonly keepDescription: boolean;
}
