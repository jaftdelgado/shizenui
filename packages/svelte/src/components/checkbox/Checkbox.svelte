<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { checkboxStyles, type CheckboxVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: CheckboxVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={checkboxStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
