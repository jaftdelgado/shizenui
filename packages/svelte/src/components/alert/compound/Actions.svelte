<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import type { AlertActionsProps } from "../_internal/index.js";
  import { useAlertContext } from "../_internal/index.js";

  let { children, class: className, ref = $bindable(null), ...rest }: AlertActionsProps = $props();
  const ctx = useAlertContext();
  const styles = $derived(alertStyles());
  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Alert.Actions",
    "Must be used inside an <Alert> component."
  );
  const actionsProps = $derived(
    mergeProps({ class: styles.actions() }, { ...rest, class: className })
  );
</script>

{#if shouldRender}
  <div bind:this={ref} {...actionsProps}>{@render children?.()}</div>
{/if}
