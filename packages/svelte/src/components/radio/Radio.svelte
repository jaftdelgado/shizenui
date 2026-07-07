<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { radioStyles, type RadioVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: RadioVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={radioStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
