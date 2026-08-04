<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { surfaceStyles, type SurfaceVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: SurfaceVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={surfaceStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
