import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ToggleVariant, ToggleSize } from "../../toggle/_internal/index.js";

type ToggleGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role">;

export type ToggleGroupOrientation = "horizontal" | "vertical";
export type ToggleGroupSelectionMode = "single" | "multiple";

interface ToggleGroupSharedProps extends ToggleGroupBaseProps {
  children?: Snippet;
  variant?: ToggleVariant;
  size?: ToggleSize;
  orientation?: ToggleGroupOrientation;
  hideSeparators?: boolean;
  disabled?: boolean;
}

type ToggleGroupSingleSelectionProps = ToggleGroupSharedProps & {
  selectionMode?: "single";
  value?: string;
  onValueChange?: (value: string | undefined) => void;
};

type ToggleGroupMultipleSelectionProps = ToggleGroupSharedProps & {
  selectionMode: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type ToggleGroupProps = ToggleGroupSingleSelectionProps | ToggleGroupMultipleSelectionProps;
