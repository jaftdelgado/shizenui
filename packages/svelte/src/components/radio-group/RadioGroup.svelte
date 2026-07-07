<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { radioGroupStyles, type RadioGroupVariants } from "@shizen-ui/styles";

  let {
    children,
    class: className = undefined,
    ...props
  }: RadioGroupVariants &
    Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
      children?: Snippet;
      class?: string | undefined;
    } = $props();
</script>

<div class={radioGroupStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
