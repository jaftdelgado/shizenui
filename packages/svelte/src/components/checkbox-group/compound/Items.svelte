<script lang="ts">
  import { checkboxGroupStyles } from "@shizen-ui/styles";

  import { cn } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useCheckboxGroupContext } from "../_internal/index.js";
  import type { CheckboxGroupItemsProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: CheckboxGroupItemsProps = $props();

  const groupCtx = useCheckboxGroupContext();
  const orientation = $derived(groupCtx.orientation);
  const styles = $derived(checkboxGroupStyles({ orientation }));

  const { shouldRender } = assertContext(
    () => !groupCtx.exists,
    "CheckboxGroup.Items",
    "Must be used inside a <CheckboxGroup> component."
  );
</script>

{#if shouldRender}
  <div bind:this={ref} class={cn(styles.items(), className)} {...rest}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
