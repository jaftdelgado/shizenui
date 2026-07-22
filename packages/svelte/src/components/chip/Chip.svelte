<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { chipStyles, type ChipVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: ChipVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={chipStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
