<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { buttonGroupStyles, type ButtonGroupVariants } from "@shizen-ui/styles";

  let {
    children,
    class: className,
    ...props
  }: ButtonGroupVariants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={buttonGroupStyles({ ...props }) || ""}>
  {@render children?.()}
</div>
