<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { input-groupStyles, type InputGroupVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: InputGroupVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={input-groupStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
