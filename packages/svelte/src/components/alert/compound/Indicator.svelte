<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import type { AlertIndicatorProps } from "../_internal/index.js";
  import { useAlertContext } from "../_internal/index.js";

  import { CircleCheckIcon, CircleXIcon, WarningIcon, InfoIcon } from "../../../lib/icons";

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
    {:else if ctx.status === "warning"}
      <WarningIcon />
    {:else if ctx.status === "danger"}
      <CircleXIcon />
    {:else if ctx.status === "success"}
      <CircleCheckIcon />
    {:else}
      <InfoIcon />
    {/if}
  </span>
{/if}
