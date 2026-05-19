<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { cn } from "../../../lib/utils";
  import { warnIf } from "../../../lib/runes/index.js";

  import type { SwitchContentProps } from "../_internal/index.js";
  import { useSwitchContext } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: SwitchContentProps & { ref?: HTMLDivElement | null } = $props();

  const ctx = useSwitchContext();
  const styles = switchStyles();

  warnIf(() => !ctx.exists, "Switch.Content", "Must be used inside a <Switch> component.");
</script>

<div
  bind:this={ref}
  class={cn(styles.content(), className)}
  {...rest}
  id={ctx.exists ? `${ctx.id}-label` : undefined}
>
  {@render children()}
</div>
