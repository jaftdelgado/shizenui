<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { cn } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useInputGroupContext } from "../_internal/index.js";
  import type { InputGroupInputProps } from "../_internal/index.js";

  let {
    class: className,
    id,
    ref = $bindable(null),
    value = $bindable(),
    ...rest
  }: InputGroupInputProps = $props();

  const ctx = useInputGroupContext();
  const styles = $derived(inputGroupStyles());

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "InputGroup.Input",
    "Must be used inside an <InputGroup> component."
  );

  $effect(() => {
    ctx.setKind("input");
    return () => ctx.setKind(null);
  });
</script>

{#if shouldRender}
  <input
    bind:this={ref}
    {id}
    type="text"
    bind:value
    disabled={ctx.disabled}
    readonly={ctx.readonly}
    required={ctx.required}
    aria-invalid={ctx.invalid ? true : undefined}
    aria-disabled={ctx.disabled ? true : undefined}
    aria-readonly={ctx.readonly ? true : undefined}
    class={cn(styles.input(), className)}
    {...rest}
  />
{/if}
