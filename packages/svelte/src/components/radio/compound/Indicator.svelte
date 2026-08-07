<script lang="ts">
  import { radioStyles } from "@shizen-ui/styles";

  import { mergeProps, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useRadioContext } from "../_internal/index.js";
  import type { RadioIndicatorProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: RadioIndicatorProps = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles());

  const isCustom = $derived(!!children);

  const indicatorProps = $derived(
    mergeProps(
      {
        class: styles.indicator(),
        "data-checked": presence(ctx.checked),
        "data-readonly": presence(ctx.readonly),
        "data-custom": presence(isCustom)
      },
      { ...rest, class: className }
    )
  );

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Radio.Indicator",
    "Must be used inside a <Radio> component."
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...indicatorProps}>
    {#if children}
      {@render children()}
    {/if}
  </span>
{/if}
