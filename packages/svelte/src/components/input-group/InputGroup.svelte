<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { cn, createId, presence } from "../../lib/utils";
  import { warnIf } from "../../lib/runes/index.js";
  import type { InputGroupProps } from "./_internal/index.js";
  import {
    InputGroupState,
    setupInputGroupContexts,
    useInputGroupContext
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    disabled = undefined,
    invalid = undefined,
    readonly = undefined,
    required = undefined,
    variant = undefined,
    size = undefined,
    id = createId("input-group", uid),
    ref = $bindable(null),
    children,
    ...rest
  }: InputGroupProps = $props();

  warnIf(
    () => !children,
    "InputGroup",
    "No children provided. Add at least <InputGroup.Input /> or <InputGroup.TextArea />."
  );

  const state = new InputGroupState({
    disabled: () => disabled,
    invalid: () => invalid,
    readonly: () => readonly,
    required: () => required,
    variant: () => variant,
    size: () => size,
    id: () => id
  });

  setupInputGroupContexts(state);

  const ctx = useInputGroupContext();

  const styles = $derived(inputGroupStyles({ variant: ctx.variant, size: ctx.size }));
</script>

<div
  bind:this={ref}
  role="presentation"
  {id}
  data-disabled={presence(ctx.disabled)}
  data-readonly={presence(ctx.readonly)}
  data-invalid={presence(ctx.invalid)}
  data-has-textarea={presence(ctx.kind === "textarea")}
  class={cn(styles.base(), className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</div>
