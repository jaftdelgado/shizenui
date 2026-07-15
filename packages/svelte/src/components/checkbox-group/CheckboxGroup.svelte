<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { checkboxGroupStyles, type CheckboxGroupVariants } from "@shizen-ui/styles";

  let {
    children,
    class: className,
    ...props
  }: CheckboxGroupVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={checkboxGroupStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
