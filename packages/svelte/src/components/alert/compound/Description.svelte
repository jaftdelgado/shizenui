<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { createId, mergeProps } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import type { AlertDescriptionProps } from "../_internal/index.js";
  import { useAlertContext } from "../_internal/index.js";

  const uid = $props.id();
  let {
    children,
    class: className,
    id = createId("alert-description", uid),
    ref = $bindable(null),
    ...rest
  }: AlertDescriptionProps = $props();
  const ctx = useAlertContext();
  const styles = $derived(alertStyles());
  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Alert.Description",
    "Must be used inside an <Alert> component."
  );

  $effect(() => {
    if (!ctx.exists) return;
    ctx.registerDescription(id);
    return () => ctx.unregisterDescription(id);
  });

  const descriptionProps = $derived(
    mergeProps({ id, class: styles.description() }, { ...rest, class: className })
  );
</script>

{#if shouldRender}
  <p bind:this={ref} {...descriptionProps}>{@render children?.()}</p>
{/if}
