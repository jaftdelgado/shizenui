import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ChipVariants } from "@shizen-ui/styles";

export type { ChipVariants };

export type ChipColor = NonNullable<ChipVariants["color"]>;
export type ChipSize = NonNullable<ChipVariants["size"]>;
export type ChipVariant = NonNullable<ChipVariants["variant"]>;

export type ChipIconContent = Snippet<[]> | string;

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
