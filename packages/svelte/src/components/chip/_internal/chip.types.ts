import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type ChipColor = "default" | "accent" | "success" | "warning" | "danger";
export type ChipSize = "sm" | "md" | "lg";
export type ChipVariant = "primary" | "secondary" | "ghost" | "soft";
export type ChipIconContent = Snippet<[]>;

type ChipBaseProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

export interface ChipProps extends ChipBaseProps {
  color?: ChipColor;
  size?: ChipSize;
  variant?: ChipVariant;
  ref?: HTMLSpanElement | null;
  children?: Snippet;
  startContent?: ChipIconContent;
  endContent?: ChipIconContent;
}
