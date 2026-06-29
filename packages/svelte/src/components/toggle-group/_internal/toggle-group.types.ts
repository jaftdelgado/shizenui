import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";

type ToggleGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export type ToggleGroupOrientation = "horizontal" | "vertical";

export interface ToggleGroupProps extends ToggleGroupBaseProps {
  children?: Snippet;
  variant?: ToggleVariant;
  size?: ToggleSize;
  orientation?: ToggleGroupOrientation;
  hideSeparator?: boolean;
  disabled?: boolean;
}
