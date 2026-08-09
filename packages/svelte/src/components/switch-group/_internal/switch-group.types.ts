import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SwitchSize } from "../../switch/_internal/switch.types.js";

export type SwitchGroupOrientation = "horizontal" | "vertical";

type SwitchGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export interface SwitchGroupProps extends SwitchGroupBaseProps {
  children?: Snippet;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  required?: boolean;
  size?: SwitchSize;
  orientation?: SwitchGroupOrientation;
  id?: string;
  ref?: HTMLDivElement | null;
}

type SwitchGroupItemsBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export interface SwitchGroupItemsProps extends SwitchGroupItemsBaseProps {
  ref?: HTMLDivElement | null;
  children: Snippet;
}
