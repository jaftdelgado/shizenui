<script lang="ts">
  import { mergeProps } from "../../../lib/utils";
  import { radioStyles } from "@shizen-ui/styles";
  import { assertContext, warnIf } from "../../../lib/runes/index.js";
  import { useRadioContext } from "../_internal/index.js";
  import type { RadioContentProps } from "../_internal/index.js";

  let { children, class: className, ref = $bindable(null), ...rest }: RadioContentProps = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles());

  const contentProps = $derived(
    mergeProps({ class: styles.content() }, { ...rest, class: className })
  );

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Radio.Content",
    "Must be used inside a <Radio> component."
  );

  warnIf(
    () => !children,
    "Radio.Content",
    "No children provided. Add content such as <Label> or <Description>."
  );
</script>

{#if shouldRender}
  <div bind:this={ref} {...contentProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
