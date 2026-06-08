<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { cn, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";

  import Thumb from "./Thumb.svelte";
  import { useSwitchContext } from "../_internal/index.js";
  import type { SwitchControlProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: SwitchControlProps & { ref?: HTMLDivElement | null } = $props();

  const ctx = useSwitchContext();
  const styles = switchStyles();

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Switch.Control",
    "Must be used inside a <Switch> component."
  );
</script>

{#if shouldRender}
  <div
    bind:this={ref}
    class={cn(styles.control(), className)}
    data-checked={presence(ctx.checked)}
    data-disabled={presence(ctx.disabled)}
    data-readonly={presence(ctx.readonly)}
    {...rest}
  >
    <!-- Default Thumb rendering is intentional.
    Use <Switch.Thumb> explicitly only for custom thumb content. -->
    {#if children}
      {@render children()}
    {:else}
      <Thumb />
    {/if}
  </div>
{/if}
