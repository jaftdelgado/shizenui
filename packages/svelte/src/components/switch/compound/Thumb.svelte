<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { cn, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";

  import { useSwitchContext } from "../_internal/index.js";
  import type { SwitchThumbProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: SwitchThumbProps = $props();

  const ctx = useSwitchContext();
  const styles = switchStyles();

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Switch.Thumb",
    "Must be used inside a <Switch> component."
  );
</script>

{#if shouldRender}
  <div
    bind:this={ref}
    class={cn(styles.thumb(), className)}
    data-checked={presence(ctx.checked)}
    data-disabled={presence(ctx.disabled)}
    data-readonly={presence(ctx.readonly)}
    {...rest}
  >
    {#if children}
      <div class={styles.thumbContent()}>
        {@render children()}
      </div>
    {/if}
  </div>
{/if}
