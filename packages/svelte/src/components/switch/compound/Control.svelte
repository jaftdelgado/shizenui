<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { mergeProps, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";

  import Thumb from "./Thumb.svelte";
  import { useSwitchContext } from "../_internal/index.js";
  import type { SwitchControlProps } from "../_internal/index.js";

  let { children, class: className, ref = $bindable(null), ...rest }: SwitchControlProps = $props();

  const ctx = useSwitchContext();
  const styles = switchStyles();

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Switch.Control",
    "Must be used inside a <Switch> component."
  );

  const controlProps = $derived(
    mergeProps(
      {
        class: styles.control(),
        "data-checked": presence(ctx.checked),
        "data-disabled": presence(ctx.disabled),
        "data-readonly": presence(ctx.readonly),
        "data-invalid": presence(ctx.invalid)
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...controlProps}>
    <!-- Default Thumb rendering is intentional.
    Use <Switch.Thumb> explicitly only for custom thumb content. -->
    {#if children}
      {@render children()}
    {:else}
      <Thumb />
    {/if}
  </span>
{/if}
