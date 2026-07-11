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
</script>

{#if shouldRender}
  <div
    bind:this={ref}
    class={cn(styles.items(), className)}
    onfocusin={handlers.handleFocusIn}
    onfocusout={handlers.handleFocusOut}
    onkeydown={handlers.handleKeydown}
    {...rest}
  >
    {@render children()}
  </div>
{/if}
