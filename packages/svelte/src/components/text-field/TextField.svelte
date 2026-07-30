<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { text-fieldStyles, type TextFieldVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: TextFieldVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={text-fieldStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
