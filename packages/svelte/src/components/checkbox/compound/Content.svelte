<script lang="ts">
  import { mergeProps } from "../../../lib/utils";
  import { checkboxStyles } from "@shizen-ui/styles";
  import { assertContext, warnIf } from "../../../lib/runes/index.js";
  import { useCheckboxContext } from "../_internal/index.js";
  import type { CheckboxContentProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: CheckboxContentProps = $props();

  const ctx = useCheckboxContext();
  const styles = $derived(checkboxStyles());

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Checkbox.Content",
    "Must be used inside a <Checkbox> component."
  );

  warnIf(
    () => !children,
    "Checkbox.Content",
    "No children provided. Add content such as <Label> or <Description>."
  );

  const contentProps = $derived(
    mergeProps({ class: styles.content() }, { ...rest, class: className })
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...contentProps}>
    {#if children}
      {@render children()}
    {/if}
  </span>
{/if}
