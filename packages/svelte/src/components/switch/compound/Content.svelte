<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { cn, createId } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";

  import type { SwitchContentProps } from "../_internal/index.js";
  import { useSwitchContext } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: SwitchContentProps & { ref?: HTMLDivElement | null } = $props();

  const uid = $props.id();
  const ctx = useSwitchContext();
  const styles = switchStyles();
  const contentId = createId("switch-content", uid);
  ctx.registerContent(contentId);

  $effect(() => {
    return () => ctx.unregisterContent(contentId);
  });

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Switch.Content",
    "Must be used inside a <Switch> component."
  );
</script>

{#if shouldRender}
  <div bind:this={ref} class={cn(styles.content(), className)} {...rest}>
    {@render children()}
  </div>
{/if}
