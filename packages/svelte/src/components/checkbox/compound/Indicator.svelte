<script lang="ts">
  import { checkboxStyles } from "@shizen-ui/styles";

  import { mergeProps, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useCheckboxContext } from "../_internal/index.js";
  import type { CheckboxIndicatorProps } from "../_internal/index.js";
  import { CheckIcon } from "../../../lib/icons";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: CheckboxIndicatorProps = $props();

  const ctx = useCheckboxContext();
  const styles = $derived(checkboxStyles());

  const isCustom = $derived(!!children);

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Checkbox.Indicator",
    "Must be used inside a <Checkbox> component."
  );

  const indicatorProps = $derived(
    mergeProps(
      {
        class: styles.indicator(),
        "data-checked": presence(ctx.checked),
        "data-indeterminate": presence(ctx.indeterminate),
        "data-disabled": presence(ctx.disabled),
        "data-invalid": presence(ctx.invalid),
        "data-custom": presence(isCustom)
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...indicatorProps}>
    {#if children}
      {@render children()}
    {:else if ctx.indeterminate}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5H8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {:else}
      <CheckIcon />
    {/if}
  </span>
{/if}
