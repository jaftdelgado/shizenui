<script lang="ts">
  import { inputStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import { useFieldStateContext } from "../../lib/index.js";
  import { InputState, resolveInputDescribedBy } from "./_internal/index.js";
  import type { InputProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    size = undefined,
    variant = undefined,
    type = "text",
    disabled = undefined,
    readonly = undefined,
    required = undefined,
    invalid = undefined,
    id = createId("input", uid),
    ref = $bindable(null),
    value = $bindable(""),
    ...rest
  }: InputProps = $props();

  const fieldContext = useFieldStateContext();

  const inputState = new InputState({
    disabled: () => disabled,
    readonly: () => readonly,
    required: () => required,
    invalid: () => invalid,
    variant: () => variant,
    size: () => size,
    id: () => id,
    fieldContext
  });

  const styles = $derived(
    inputStyles({ size: inputState.finalSize, variant: inputState.finalVariant })
  );

  const describedByResult = $derived(
    resolveInputDescribedBy(inputState.fieldCtx, inputState.finalInvalid)
  );
</script>

<input
  bind:this={ref}
  bind:value
  {id}
  {type}
  disabled={inputState.finalDisabled}
  readonly={inputState.finalReadonly}
  required={inputState.finalRequired}
  aria-invalid={inputState.finalInvalid ? true : undefined}
  aria-describedby={describedByResult.describedBy}
  aria-errormessage={describedByResult.errorMessageId}
  data-invalid={presence(inputState.finalInvalid)}
  data-disabled={presence(inputState.finalDisabled)}
  data-readonly={presence(inputState.finalReadonly)}
  class={cn(styles, className)}
  {...rest}
/>
