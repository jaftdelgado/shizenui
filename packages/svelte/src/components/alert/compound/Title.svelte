<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { createId, mergeProps } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import type { AlertTitleProps } from "../_internal/index.js";
  import { useAlertContext } from "../_internal/index.js";

  const uid = $props.id();
  let {
    children,
    class: className,
    id = createId("alert-title", uid),
    ref = $bindable(null),
    ...rest
  }: AlertTitleProps = $props();
  const ctx = useAlertContext();
  const styles = $derived(alertStyles());
  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Alert.Title",
    "Must be used inside an <Alert> component."
  );

  $effect(() => {
    if (!ctx.exists) return;
    ctx.registerTitle(id);
    return () => ctx.unregisterTitle(id);
  });

  const titleProps = $derived(
    mergeProps({ id, class: styles.title() }, { ...rest, class: className })
  );
</script>

{#if shouldRender}
  <p bind:this={ref} {...titleProps}>{@render children?.()}</p>
{/if}
