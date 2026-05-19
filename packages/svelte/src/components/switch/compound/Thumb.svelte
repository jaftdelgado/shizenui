<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { cn } from "../../../lib/utils";
  import { warnIf } from "../../../lib/runes/index.js";

  import { useSwitchContext } from "../_internal/index.js";
  import type { SwitchThumbProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: SwitchThumbProps & { ref?: HTMLDivElement | null } = $props();

  const ctx = useSwitchContext();
  const styles = $derived(switchStyles());

  warnIf(() => !ctx.exists, "Switch.Thumb", "Must be used inside a <Switch> component.");
</script>

<div
  bind:this={ref}
  class={cn(styles.thumb(), className)}
  data-checked={ctx.checked ? "" : undefined}
  data-disabled={ctx.disabled ? "" : undefined}
  data-invalid={ctx.invalid ? "" : undefined}
  {...rest}
>
  {#if children}
    <div class={styles.thumbContent()}>
      {@render children()}
    </div>
  {/if}
</div>
