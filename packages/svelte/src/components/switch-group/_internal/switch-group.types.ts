import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SwitchSize } from "../../switch/_internal/index.js";
import type { SwitchGroupOrientation } from "./switch-group.context.js";

export interface SwitchGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
  disabled?: boolean;
  readonly?: boolean;
  size?: SwitchSize;
  orientation?: SwitchGroupOrientation;
  id?: string;
}

export interface SwitchGroupItemsProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
}
