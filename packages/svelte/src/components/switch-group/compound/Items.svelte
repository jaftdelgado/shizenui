<script lang="ts">
  import { mergeProps } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { switchGroupStyles } from "@shizen-ui/styles";
  import { useSwitchGroupContext } from "../_internal/index.js";
  import type { SwitchGroupItemsProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: SwitchGroupItemsProps = $props();

  const groupCtx = useSwitchGroupContext();
  const { shouldRender } = assertContext(
    () => !groupCtx.exists,
    "SwitchGroup.Items",
    "Must be used inside a <SwitchGroup> component."
  );
  const orientation = $derived(groupCtx.orientation);

  const styles = $derived(switchGroupStyles({ orientation }));

  const itemsProps = $derived(mergeProps({ class: styles.items() }, { ...rest, class: className }));
</script>

{#if shouldRender}
  <div bind:this={ref} {...itemsProps}>
    {@render children()}
  </div>
{/if}
