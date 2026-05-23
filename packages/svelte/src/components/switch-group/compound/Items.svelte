<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { switchGroupStyles } from "@shizen-ui/styles";
  import { useSwitchGroupContext } from "../_internal/index.js";
  import type { SwitchGroupItemsProps } from "../_internal/index.js";

  let { children, class: className, ...rest }: SwitchGroupItemsProps = $props();

  const groupCtx = useSwitchGroupContext();
  const { shouldRender } = assertContext(
    () => !groupCtx.exists,
    "SwitchGroup.Items",
    "Must be used inside a <SwitchGroup> component."
  );
  const orientation = $derived(groupCtx.orientation);

  const styles = $derived(switchGroupStyles({ orientation }));
</script>

{#if shouldRender}
  <div class={cn(styles.items(), className)} {...rest}>
    {@render children()}
  </div>
{/if}
