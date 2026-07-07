import type { Snippet } from "svelte";
import type { RadioGroupVariants } from "@shizen-ui/styles";

export interface RadioGroupProps extends RadioGroupVariants {
  children: Snippet;
  class?: string;
  value?: string;
  name?: string;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}
