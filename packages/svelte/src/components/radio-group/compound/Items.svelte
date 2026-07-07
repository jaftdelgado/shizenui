<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioGroupStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { useRadioGroupContext } from "../../../contexts/internal/index.js";
  import { createRadioGroupItemsHandlers } from "../_internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const groupCtx = useRadioGroupContext();
  const orientation = $derived(groupCtx.orientation);
  const styles = $derived(radioGroupStyles({ orientation }));

  let container: HTMLDivElement;

  const handlers = createRadioGroupItemsHandlers(() => container, groupCtx);
</script>

<div
  bind:this={container}
  class={cn(styles.items(), className)}
  onfocusin={handlers.handleFocusIn}
  {...rest}
>
  {@render children()}
</div>
