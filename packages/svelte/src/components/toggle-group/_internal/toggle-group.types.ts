import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";

type ToggleGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export type ToggleGroupOrientation = "horizontal" | "vertical";
export type ToggleGroupSelectionMode = "single" | "multiple";

export interface ToggleGroupProps extends ToggleGroupBaseProps {
  children?: Snippet;
  variant?: ToggleVariant;
  size?: ToggleSize;
  orientation?: ToggleGroupOrientation;
  hideSeparator?: boolean;
  disabled?: boolean;
  selectionMode?: ToggleGroupSelectionMode;
  value?: string | string[];
  onValueChange?: ((value: string | undefined) => void) | ((value: string[]) => void);
}
