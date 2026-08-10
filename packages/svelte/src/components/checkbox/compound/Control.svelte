<script lang="ts">
  import { checkboxStyles } from "@shizen-ui/styles";

  import { mergeProps, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useCheckboxContext } from "../_internal/index.js";
  import type { CheckboxControlProps } from "../_internal/index.js";

  import Indicator from "./Indicator.svelte";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: CheckboxControlProps = $props();

  const ctx = useCheckboxContext();
  const styles = $derived(checkboxStyles());

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Checkbox.Control",
    "Must be used inside a <Checkbox> component."
  );

  const controlProps = $derived(
    mergeProps(
      {
        class: styles.control(),
        "data-checked": presence(ctx.checked),
        "data-indeterminate": presence(ctx.indeterminate),
        "data-disabled": presence(ctx.disabled),
        "data-readonly": presence(ctx.readonly),
        "data-invalid": presence(ctx.invalid)
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...controlProps}>
    {#if children}
      {@render children()}
    {:else}
      <Indicator />
    {/if}
  </span>
{/if}
