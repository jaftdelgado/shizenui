<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { textAreaStyles, type TextAreaVariants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: TextAreaVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={textAreaStyles({ ...props })}>
  {@render children?.()}
</div>
