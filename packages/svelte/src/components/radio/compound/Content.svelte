<script lang="ts">
  import { cn, createId } from "../../../lib/utils";
  import { radioStyles } from "@shizen-ui/styles";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useRadioContext } from "../_internal/index.js";
  import type { RadioContentProps } from "../_internal/index.js";

  const uid = $props.id();

  let { children, class: className, ref = $bindable(null), ...rest }: RadioContentProps = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles());
  const contentId = createId("radio-content", uid);

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Radio.Content",
    "Must be used inside a <Radio> component."
  );

  ctx.registerContent(contentId);

  $effect(() => {
    return () => ctx.unregisterContent(contentId);
  });
</script>

{#if shouldRender}
  <div bind:this={ref} class={cn(styles.content(), className)} {...rest}>
    {@render children()}
  </div>
{/if}
