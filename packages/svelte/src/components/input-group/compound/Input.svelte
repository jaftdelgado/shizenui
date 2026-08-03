<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { cn, createId } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useFieldStateContext } from "../../../lib/index.js";
  import { useTextFieldContext } from "../../text-field/_internal/index.js";
  import {
    createTextFieldControlHandlers,
    resolveTextFieldControlDescribedBy
  } from "../../text-field/_internal/index.js";
  import { useInputGroupContext } from "../_internal/index.js";
  import type { InputGroupInputProps } from "../_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    id = createId("input-group-input", uid),
    ref = $bindable(null),
    value = $bindable(""),
    oninput,
    oninvalid,
    ...rest
  }: InputGroupInputProps = $props();

  const ctx = useInputGroupContext();
  const fieldCtx = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();
  const styles = $derived(inputGroupStyles());
  const describedByResult = $derived(
    resolveTextFieldControlDescribedBy(
      fieldCtx,
      ctx.invalid,
      textFieldCtx.exists ? textFieldCtx : undefined
    )
  );

  const handlers = createTextFieldControlHandlers<HTMLInputElement>({
    reporters: [ctx, textFieldCtx],
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

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "InputGroup.Input",
    "Must be used inside an <InputGroup> component."
  );

  $effect(() => {
    ctx.setKind("input");
    ctx.setInputRef(ref);
    return () => {
      ctx.setKind(null);
      ctx.setInputRef(null);
    };
  });

  $effect(() => {
    if (!textFieldCtx.exists) return;

    textFieldCtx.setControl(ref);

    return () => {
      if (textFieldCtx.control === ref) textFieldCtx.setControl(null);
    };
  });
</script>

{#if shouldRender}
  <input
    bind:this={ref}
    id={ctx.inputId ?? id}
    type="text"
    bind:value={getValue, setValue}
    disabled={ctx.disabled}
    readonly={ctx.readonly}
    required={ctx.required}
    aria-invalid={ctx.invalid ? true : undefined}
    aria-disabled={ctx.disabled ? true : undefined}
    aria-readonly={ctx.readonly ? true : undefined}
    aria-describedby={describedByResult.describedBy}
    aria-errormessage={describedByResult.errorMessageId}
    class={cn(styles.input(), className)}
    oninput={handlers.handleInput}
    oninvalid={handlers.handleInvalid}
    {...rest}
  />
{/if}
