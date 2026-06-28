<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { toggleStyles, type ToggleVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: ToggleVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={toggleStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
