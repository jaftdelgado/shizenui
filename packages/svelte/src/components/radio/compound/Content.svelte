<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { radioStyles } from "@shizen-ui/styles";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useRadioContext } from "../_internal/index.js";
  import type { RadioContentProps } from "../_internal/index.js";

  let { children, class: className, ref = $bindable(null), ...rest }: RadioContentProps = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles());

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Radio.Content",
    "Must be used inside a <Radio> component."
  );
</script>

{#if shouldRender}
  <div bind:this={ref} class={cn(styles.content(), className)} {...rest}>
    {@render children()}
  </div>
{/if}
