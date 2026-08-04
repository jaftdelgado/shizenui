import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { CheckboxVariant } from "../../checkbox/_internal/checkbox.types.js";

export type CheckboxGroupOrientation = "horizontal" | "vertical";

type CheckboxGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export interface CheckboxGroupProps extends CheckboxGroupBaseProps {
  children?: Snippet;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  name?: string;
  orientation?: CheckboxGroupOrientation;
  invalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  variant?: CheckboxVariant;
  id?: string;
  ref?: HTMLDivElement | null;
}

export interface CheckboxGroupItemsProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}
