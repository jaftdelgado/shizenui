<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { inputStyles, type InputVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: InputVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={inputStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
