import type { HTMLInputAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SwitchSize } from "./switch.context.js";

type SwitchBaseProps = Omit<
  HTMLInputAttributes,
  "checked" | "size" | "type" | "role" | "tabindex" | "onclick" | "disabled" | "value" | "id"
>;

export interface SwitchProps extends SwitchBaseProps {
  invalid?: boolean;
  checked?: boolean;
  disabled?: boolean;
  value?: string;
  id?: string;
  children: Snippet;
  size?: SwitchSize;
  onCheckedChange?: (checked: boolean) => void;
  onclick?: (e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void;
}
