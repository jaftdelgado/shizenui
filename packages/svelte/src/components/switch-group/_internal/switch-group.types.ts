import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SwitchSize } from "../../switch/_internal/index.js";

export type SwitchGroupOrientation = "horizontal" | "vertical";

export interface SwitchGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  disabled?: boolean;
  readonly?: boolean;
  size?: SwitchSize;
  orientation?: SwitchGroupOrientation;
  id?: string;
  ref?: HTMLDivElement | null;
}

export interface SwitchGroupItemsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: HTMLDivElement | null;
  children: Snippet;
}
