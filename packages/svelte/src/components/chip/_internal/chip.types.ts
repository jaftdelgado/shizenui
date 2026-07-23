import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ChipVariants } from "@shizen-ui/styles";

export type { ChipVariants };

export type ChipStatus = NonNullable<ChipVariants["status"]>;
export type ChipVariant = NonNullable<ChipVariants["variant"]>;

export type ChipIconContent = Snippet<[]> | string;

type ChipBaseProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

export interface ChipProps extends ChipBaseProps {
  status?: ChipStatus;
  variant?: ChipVariant;
  ref?: HTMLSpanElement | null;
  children?: Snippet;
  startContent?: ChipIconContent;
  endContent?: ChipIconContent;
}
