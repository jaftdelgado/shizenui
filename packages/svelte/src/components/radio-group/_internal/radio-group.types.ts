import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { RadioVariant } from "../../radio/_internal/radio.types.js";

export type RadioGroupOrientation = "horizontal" | "vertical";

type RadioGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export interface RadioGroupProps extends RadioGroupBaseProps {
  children?: Snippet;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  name?: string;
  orientation?: RadioGroupOrientation;
  invalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  variant?: RadioVariant;
  id?: string;
  ref?: HTMLDivElement | null;
}

type RadioGroupItemsBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onfocusin" | "onkeydown"
>;

export interface RadioGroupItemsProps extends RadioGroupItemsBaseProps {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}
