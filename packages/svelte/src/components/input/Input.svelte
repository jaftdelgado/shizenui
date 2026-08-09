<script lang="ts">
  import { inputStyles } from "@shizen-ui/styles";

  import { useFieldStateContext } from "../../lib/index.js";
  import { syncFormReset } from "../../lib/runes/index.js";
  import type { SubmissionInvalidState } from "../../lib/runes/index.js";
  import { createId, mergeProps, presence } from "../../lib/utils/index.js";
  import { useTextFieldContext } from "../text-field/_internal/index.js";
  import {
    createTextFieldControlHandlers,
    normalizeTextFieldControlValue,
    resolveTextFieldControlDescribedBy,
    resolveTextFieldControlType,
    warnIfTextFieldPropsOverride,
    warnIfUnsupportedTextFieldControlType
  } from "../text-field/_internal/index.js";
  import { InputState, setupInputForm } from "./_internal/index.js";
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
    "aria-describedby": externalDescribedBy,
    "aria-errormessage": externalErrorMessageId,
    "aria-invalid": externalAriaInvalid,
    ...rest
  }: InputProps = $props();

  const fieldContext = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();
  const resolvedType = $derived(resolveTextFieldControlType(type));
  let submissionInvalid: SubmissionInvalidState;

  const inputState = new InputState({
    disabled: () => disabled,
    readonly: () => readonly,
    required: () => required,
    invalid: () => invalid,
    variant: () => variant,
    size: () => size,
    id: () => id,
    submissionInvalid: () => submissionInvalid.value,
    fieldContext,
    textFieldContext: textFieldCtx
  });

  const styles = $derived(
    inputStyles({ size: inputState.finalSize, variant: inputState.finalVariant })
  );

  const describedByResult = $derived(
    resolveTextFieldControlDescribedBy(
      inputState.fieldCtx,
      inputState.finalInvalid,
      textFieldCtx.exists ? textFieldCtx : undefined,
      externalDescribedBy,
      externalErrorMessageId
    )
  );

  warnIfTextFieldPropsOverride({
    component: "Input",
    context: textFieldCtx,
    props: {
      disabled: () => disabled,
      invalid: () => invalid,
      readonly: () => readonly,
      required: () => required,
      size: () => size,
      variant: () => variant
    }
  });
  warnIfUnsupportedTextFieldControlType(() => type, "Input");

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

  submissionInvalid = setupInputForm({
    inputState,
    textFieldContext: textFieldCtx,
    getRef: () => ref,
    getValue,
    getConstraints: () => ({
      required: inputState.finalRequired,
      disabled: inputState.finalDisabled,
      readonly: inputState.finalReadonly,
      type: resolvedType,
      pattern: rest.pattern ?? undefined,
      min: rest.min ?? undefined,
      max: rest.max ?? undefined,
      step: rest.step ?? undefined,
      minLength: rest.minlength ?? undefined,
      maxLength: rest.maxlength ?? undefined
    })
  });

  const handlers = createTextFieldControlHandlers<HTMLInputElement>({
    reporters: [inputState, textFieldCtx],
    submissionInvalid,
    getOnInput: () => oninput,
    getOnInvalid: () => oninvalid
  });

  $effect(() => {
    if (!textFieldCtx.exists) return;

    textFieldCtx.registerControl(uid, ref);

    return () => {
      textFieldCtx.unregisterControl(uid);
    };
  });

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      inputState.resetValidation();
      submissionInvalid.clear();
    }
  });

  const inputProps = $derived(
    mergeProps(
      {
        id: inputState.finalId,
        type: resolvedType,
        disabled: inputState.finalDisabled,
        readonly: inputState.finalReadonly,
        required: inputState.finalRequired,
        ...(inputState.finalInvalid || inputState.fieldCtx.exists || invalid !== undefined
          ? { "aria-invalid": inputState.finalInvalid ? true : undefined }
          : { "aria-invalid": externalAriaInvalid }),
        ...(describedByResult.describedBy
          ? { "aria-describedby": describedByResult.describedBy }
          : {}),
        ...(describedByResult.errorMessageId
          ? { "aria-errormessage": describedByResult.errorMessageId }
          : {}),
        "data-slot": "input",
        "data-invalid": presence(inputState.finalInvalid),
        "data-disabled": presence(inputState.finalDisabled),
        "data-readonly": presence(inputState.finalReadonly),
        class: styles
      },
      { ...rest, class: className }
    )
  );
</script>

<input
  bind:this={ref}
  bind:value={getValue, setValue}
  {...inputProps}
  oninput={handlers.handleInput}
  oninvalid={handlers.handleInvalid}
/>
