<script lang="ts">
  import { mergeProps } from "../../../lib/utils";
  import { radioGroupStyles } from "@shizen-ui/styles";
  import { assertContext, warnIf } from "../../../lib/runes/index.js";
  import { useRadioGroupContext, createRadioGroupItemsHandlers } from "../_internal/index.js";
  import type { RadioGroupItemsProps } from "../_internal/index.js";

  const itemsUid = $props.id();

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

  warnIf(
    () => !children,
    "RadioGroup.Items",
    "No children provided. Add at least one <Radio> as a child."
  );

  const handlers = createRadioGroupItemsHandlers({
    getContainer: () => ref,
    groupCtx
  });

  const itemsProps = $derived(
    mergeProps(
      {
        class: styles.items(),
        onfocusin: handlers.handleFocusIn,
        onkeydown: handlers.handleKeydown
      },
      { ...rest, class: className }
    )
  );

  $effect(() => {
    if (!shouldRender) return;

    groupCtx.registerItems(itemsUid);

    return () => {
      groupCtx.unregisterItems(itemsUid);
    };
  });
</script>

{#if shouldRender}
  <div bind:this={ref} {...itemsProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
