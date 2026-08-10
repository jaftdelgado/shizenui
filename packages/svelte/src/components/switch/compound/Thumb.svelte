<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { mergeProps, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";

  import { useSwitchContext } from "../_internal/index.js";
  import type { SwitchThumbProps } from "../_internal/index.js";

  let { children, class: className, ref = $bindable(null), ...rest }: SwitchThumbProps = $props();

  const ctx = useSwitchContext();
  const styles = switchStyles();

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "Switch.Thumb",
    "Must be used inside a <Switch> component."
  );

  const thumbProps = $derived(
    mergeProps(
      {
        class: styles.thumb(),
        "data-checked": presence(ctx.checked),
        "data-disabled": presence(ctx.disabled),
        "data-readonly": presence(ctx.readonly),
        "data-invalid": presence(ctx.invalid)
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender}
  <span bind:this={ref} {...thumbProps}>
    {#if children}
      <span class={styles.thumbContent()}>
        {@render children()}
      </span>
    {/if}
  </span>
{/if}
