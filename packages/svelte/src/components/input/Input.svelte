<script lang="ts">
  import { inputStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import { useFieldStateContext } from "../../lib/index.js";
  import { useTextFieldContext } from "../text-field/_internal/index.js";
  import { InputState, createInputHandlers, resolveInputDescribedBy } from "./_internal/index.js";
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
    oninput,
    oninvalid,
    ...rest
  }: InputProps = $props();

  const fieldContext = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();

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
    resolveInputDescribedBy(
      inputState.fieldCtx,
      inputState.finalInvalid,
      textFieldCtx.exists ? textFieldCtx : undefined
    )
  );

  const handlers = createInputHandlers({
    textFieldCtx,
    getOnInput: () => oninput,
    getOnInvalid: () => oninvalid
  });

  function getValue(): string {
    return textFieldCtx.exists ? textFieldCtx.value : value;
  }

  function setValue(next: string): void {
    if (textFieldCtx.exists) {
      textFieldCtx.setValue(next);
      return;
    }

    value = next;
  }

  $effect(() => {
    if (!textFieldCtx.exists) return;

    textFieldCtx.setControl(ref);

    return () => {
      if (textFieldCtx.control === ref) textFieldCtx.setControl(null);
    };
  });
</script>

<input
  bind:this={ref}
  bind:value={getValue, setValue}
  id={inputState.finalId}
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
  oninput={handlers.handleInput}
  oninvalid={handlers.handleInvalid}
  {...rest}
/>
