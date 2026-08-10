<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { mergeProps, presence } from "../../../lib/utils/index.js";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useInputGroupContext } from "../_internal/index.js";
  import type { InputGroupPrefixProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: InputGroupPrefixProps = $props();

  const ctx = useInputGroupContext();
  const styles = inputGroupStyles();

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "InputGroup.Prefix",
    "Must be used inside an <InputGroup> component."
  );

  const prefixProps = $derived(
    mergeProps(
      {
        class: styles.prefix(),
        inert: ctx.disabled,
        "data-disabled": presence(ctx.disabled),
        "data-readonly": presence(ctx.readonly),
        "data-invalid": presence(ctx.invalid)
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender}
  <div bind:this={ref} {...prefixProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
