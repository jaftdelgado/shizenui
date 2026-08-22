<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import type { AlertContentProps } from "../_internal/index.js";
  import { useAlertContext } from "../_internal/index.js";

  let { children, class: className, ref = $bindable(null), ...rest }: AlertContentProps = $props();
  const ctx = useAlertContext();
  const styles = $derived(alertStyles());
  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Alert.Content",
    "Must be used inside an <Alert> component."
  );
  const contentProps = $derived(
    mergeProps({ class: styles.content() }, { ...rest, class: className })
  );
</script>

{#if shouldRender}
  <div bind:this={ref} {...contentProps}>{@render children?.()}</div>
{/if}
