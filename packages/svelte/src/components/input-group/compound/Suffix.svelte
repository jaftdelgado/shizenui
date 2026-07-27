<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { cn, presence } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useInputGroupContext } from "../_internal/index.js";
  import type { InputGroupSuffixProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: InputGroupSuffixProps = $props();

  const ctx = useInputGroupContext();
  const styles = $derived(inputGroupStyles());

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "InputGroup.Suffix",
    "Must be used inside an <InputGroup> component."
  );
</script>

{#if shouldRender}
  <div
    bind:this={ref}
    class={cn(styles.suffix(), className)}
    data-disabled={presence(ctx.disabled)}
    data-readonly={presence(ctx.readonly)}
    data-invalid={presence(ctx.invalid)}
    {...rest}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
