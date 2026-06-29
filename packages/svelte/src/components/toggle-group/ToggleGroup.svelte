<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { toggleGroupStyles, type ToggleGroupVariants } from "@shizen-ui/styles";

  let {
    children,
    class: className,
    ...props
  }: ToggleGroupVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={toggleGroupStyles({ ...props })}>
  {@render children?.()}
</div>
