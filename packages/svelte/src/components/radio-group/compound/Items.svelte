<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { radioGroupStyles } from "@shizen-ui/styles";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useRadioGroupContext, createRadioGroupItemsHandlers } from "../_internal/index.js";
  import type { RadioGroupItemsProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: RadioGroupItemsProps = $props();

  const groupCtx = useRadioGroupContext();
  const orientation = $derived(groupCtx.orientation);
  const styles = $derived(radioGroupStyles({ orientation }));

  const { shouldRender } = assertContext(
    () => !groupCtx.exists,
    "RadioGroup.Items",
    "Must be used inside a <RadioGroup> component."
  );

  const handlers = createRadioGroupItemsHandlers({
    getContainer: () => ref,
    groupCtx
  });

  $effect(() => {
    if (!shouldRender) return;

    groupCtx.registerItems();

    return () => {
      groupCtx.unregisterItems();
    };
  });
</script>

{#if shouldRender}
  <div
    bind:this={ref}
    class={cn(styles.items(), className)}
    onfocusin={handlers.handleFocusIn}
    onkeydown={handlers.handleKeydown}
    {...rest}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
