<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { cn, createId } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useFieldStateContext } from "../../../lib/index.js";
  import { useTextFieldContext } from "../../text-field/_internal/index.js";
  import {
    createTextFieldControlHandlers,
    normalizeTextFieldControlValue,
    resolveTextFieldControlDescribedBy,
    resolveTextFieldControlType,
    warnIfUnsupportedTextFieldControlType
  } from "../../text-field/_internal/index.js";
  import { syncInputGroupControlValidity, useInputGroupContext } from "../_internal/index.js";
  import type { InputGroupInputProps } from "../_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    id = createId("input-group-input", uid),
    ref = $bindable(null),
    value = $bindable(""),
    type = "text",
    oninput,
    oninvalid,
    ...rest
  }: InputGroupInputProps = $props();

  const ctx = useInputGroupContext();
  const fieldCtx = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();
  const resolvedType = $derived(resolveTextFieldControlType(type));
  const styles = inputGroupStyles();
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

  warnIfUnsupportedTextFieldControlType(() => type, "InputGroup.Input");

  syncInputGroupControlValidity({
    getRef: () => ref,
    getValue: () => getValue(),
    getConstraints: () => ({
      required: ctx.required,
      disabled: ctx.disabled,
      readonly: ctx.readonly,
      type: resolvedType,
      pattern: rest.pattern ?? undefined,
      min: rest.min ?? undefined,
      max: rest.max ?? undefined,
      step: rest.step ?? undefined,
      minLength: rest.minlength ?? undefined,
      maxLength: rest.maxlength ?? undefined
    }),
    inputGroupContext: ctx,
    textFieldContext: textFieldCtx
  });

  function getValue(): string {
    return textFieldCtx.exists ? textFieldCtx.value : normalizeTextFieldControlValue(value);
  }

  function setValue(next: string | number | null | undefined): void {
    const normalized = normalizeTextFieldControlValue(next);
    if (textFieldCtx.exists) {
      textFieldCtx.setValue(normalized);
      return;
    }

    value = normalized;
  }

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "InputGroup.Input",
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
  <input
    bind:this={ref}
    id={ctx.inputId ?? id}
    {...rest}
    type={resolvedType}
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
  />
{/if}
