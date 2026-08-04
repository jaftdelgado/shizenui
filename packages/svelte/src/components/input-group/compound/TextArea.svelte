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
  import { syncInputGroupControlValidity, useInputGroupContext } from "../_internal/index.js";
  import type { InputGroupTextAreaProps } from "../_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    id = createId("input-group-textarea", uid),
    ref = $bindable(null),
    value = $bindable(""),
    oninput,
    oninvalid,
    ...rest
  }: InputGroupTextAreaProps = $props();

  const ctx = useInputGroupContext();
  const fieldCtx = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();
  const styles = inputGroupStyles();
  const describedByResult = $derived(
    resolveTextFieldControlDescribedBy(
      fieldCtx,
      ctx.invalid,
      textFieldCtx.exists ? textFieldCtx : undefined
    )
  );

  const handlers = createTextFieldControlHandlers<HTMLTextAreaElement>({
    reporters: [ctx, textFieldCtx],
    getOnInput: () => oninput,
    getOnInvalid: () => oninvalid
  });

  syncInputGroupControlValidity({
    getRef: () => ref,
    getValue: () => getValue(),
    getConstraints: () => ({
      required: ctx.required,
      disabled: ctx.disabled,
      readonly: ctx.readonly,
      minLength: rest.minlength ?? undefined,
      maxLength: rest.maxlength ?? undefined
    }),
    inputGroupContext: ctx,
    textFieldContext: textFieldCtx
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
    "InputGroup.TextArea",
    "Must be used inside an <InputGroup> component."
  );

  $effect(() => {
    ctx.registerControl(uid, ref);
    return () => {
      ctx.unregisterControl(uid);
    };
  });

  $effect(() => {
    if (!textFieldCtx.exists) return;

    textFieldCtx.registerControl(uid, ref);

    return () => {
      textFieldCtx.unregisterControl(uid);
    };
  });
</script>

{#if shouldRender}
  <textarea
    bind:this={ref}
    id={ctx.inputId ?? id}
    {...rest}
    bind:value={getValue, setValue}
    disabled={ctx.disabled}
    readonly={ctx.readonly}
    required={ctx.required}
    aria-invalid={ctx.invalid ? true : undefined}
    aria-disabled={ctx.disabled ? true : undefined}
    aria-readonly={ctx.readonly ? true : undefined}
    aria-describedby={describedByResult.describedBy}
    aria-errormessage={describedByResult.errorMessageId}
    class={cn(styles.textarea(), className)}
    oninput={handlers.handleInput}
    oninvalid={handlers.handleInvalid}
  ></textarea>
{/if}
