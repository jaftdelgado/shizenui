import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface RadioProps extends Omit<HTMLAttributes<HTMLDivElement>, "checked" | "onclick"> {
  value: string;
  invalid?: boolean;
  disabled?: boolean;
  checked?: boolean;
  children: Snippet;
  name?: string;
  id?: string;
  onclick?: (e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void;
}

export interface RadioContext {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}
