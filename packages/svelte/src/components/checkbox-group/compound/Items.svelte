<script lang="ts">
  import { checkboxGroupStyles } from "@shizen-ui/styles";

  import { mergeProps } from "../../../lib/utils";
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

  const itemsProps = $derived(
    mergeProps({ class: styles.items() }, { ...rest, class: className })
  );
</script>

{#if shouldRender}
  <div bind:this={ref} {...itemsProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
