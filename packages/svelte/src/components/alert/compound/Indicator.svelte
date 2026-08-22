<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import type { AlertIndicatorProps } from "../_internal/index.js";
  import { useAlertContext } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: AlertIndicatorProps = $props();
  const ctx = useAlertContext();
  const styles = $derived(alertStyles());
  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Alert.Indicator",
    "Must be used inside an <Alert> component."
  );

  const indicatorProps = $derived(
    mergeProps(
      { class: styles.indicator(), "aria-hidden": children ? undefined : true },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...indicatorProps}>
    {#if children}
      {@render children()}
    {:else if ctx.color === "warning"}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
        ><path
          d="M12 3 2.8 20h18.4L12 3Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        /><path
          d="M12 9v5m0 3h.01"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        /></svg
      >
    {:else if ctx.color === "danger" || ctx.color === "error"}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
        ><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" /><path
          d="m9 9 6 6m0-6-6 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        /></svg
      >
    {:else if ctx.color === "success"}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
        ><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" /><path
          d="m8 12 2.5 2.5L16 9"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg
      >
    {:else}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
        ><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" /><path
          d="M12 10v5m0-8h.01"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        /></svg
      >
    {/if}
  </span>
{/if}
