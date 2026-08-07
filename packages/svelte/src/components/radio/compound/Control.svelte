<script lang="ts">
  import { radioStyles } from "@shizen-ui/styles";

  import { mergeProps, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useRadioContext } from "../_internal/index.js";
  import type { RadioControlProps } from "../_internal/index.js";

  import Indicator from "./Indicator.svelte";

  let { children, class: className, ref = $bindable(null), ...rest }: RadioControlProps = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles());

  const controlProps = $derived(
    mergeProps(
      {
        class: styles.control(),
        "data-checked": presence(ctx.checked),
        "data-disabled": presence(ctx.disabled),
        "data-readonly": presence(ctx.readonly),
        "data-invalid": presence(ctx.invalid)
      },
      { ...rest, class: className }
    )
  );

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Radio.Control",
    "Must be used inside a <Radio> component."
  );
</script>

{#if shouldRender}
  <div bind:this={ref} {...controlProps}>
    {#if children}
      {@render children()}
    {:else}
      <Indicator />
    {/if}
  </div>
{/if}
