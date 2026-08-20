<script lang="ts">
  import { textAreaStyles } from "@shizen-ui/styles";

  import { useFieldStateContext } from "../../lib/index.js";
  import { syncFormReset } from "../../lib/runes/index.js";
  import type { SubmissionInvalidState } from "../../lib/runes/index.js";
  import { createId, mergeProps, presence } from "../../lib/utils/index.js";
  import { useTextFieldContext } from "../text-field/_internal/index.js";
  import {
    createTextFieldControlHandlers,
    resolveTextFieldControlDescribedBy,
    warnIfTextFieldPropsOverride
  } from "../text-field/_internal/index.js";
  import { TextAreaState, setupTextAreaForm } from "./_internal/index.js";
  import type { TextAreaProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    variant = undefined,
    disabled = undefined,
    readonly = undefined,
    required = undefined,
    invalid = undefined,
    id = createId("text-area", uid),
    ref = $bindable(null),
    value = $bindable(""),
    oninput,
    oninvalid,
    "aria-describedby": externalDescribedBy,
    "aria-errormessage": externalErrorMessageId,
    "aria-invalid": externalAriaInvalid,
    ...rest
  }: TextAreaProps = $props();

  const fieldContext = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();
  let submissionInvalid: SubmissionInvalidState;

  const textAreaState = new TextAreaState({
    disabled: () => disabled,
    readonly: () => readonly,
    required: () => required,
    invalid: () => invalid,
    variant: () => variant,
    id: () => id,
    submissionInvalid: () => submissionInvalid.value,
    fieldContext,
    textFieldContext: textFieldCtx
  });

  const styles = $derived(textAreaStyles({ variant: textAreaState.finalVariant }));

  const describedByResult = $derived(
    resolveTextFieldControlDescribedBy(
      textAreaState.fieldCtx,
      textAreaState.finalInvalid,
      textFieldCtx.exists ? textFieldCtx : undefined,
      externalDescribedBy,
      externalErrorMessageId
    )
  );

  warnIfTextFieldPropsOverride({
    component: "TextArea",
    context: textFieldCtx,
    props: {
      disabled: () => disabled,
      invalid: () => invalid,
      readonly: () => readonly,
      required: () => required,
      variant: () => variant
    }
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

  submissionInvalid = setupTextAreaForm({
    textAreaState,
    textFieldContext: textFieldCtx,
    getRef: () => ref,
    getValue,
    getConstraints: () => ({
      required: textAreaState.finalRequired,
      disabled: textAreaState.finalDisabled,
      readonly: textAreaState.finalReadonly,
      minLength: rest.minlength ?? undefined,
      maxLength: rest.maxlength ?? undefined
    })
  });

  const handlers = createTextFieldControlHandlers<HTMLTextAreaElement>({
    reporters: [textAreaState, textFieldCtx],
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
      textAreaState.resetValidation();
      submissionInvalid.clear();
    }
  });

  const textAreaProps = $derived(
    mergeProps(
      {
        id: textAreaState.finalId,
        disabled: textAreaState.finalDisabled,
        readonly: textAreaState.finalReadonly,
        required: textAreaState.finalRequired,
        ...(textAreaState.finalInvalid || textAreaState.fieldCtx.exists || invalid !== undefined
          ? { "aria-invalid": textAreaState.finalInvalid ? true : undefined }
          : { "aria-invalid": externalAriaInvalid }),
        ...(describedByResult.describedBy
          ? { "aria-describedby": describedByResult.describedBy }
          : {}),
        ...(describedByResult.errorMessageId
          ? { "aria-errormessage": describedByResult.errorMessageId }
          : {}),
        "data-slot": "text-area",
        "data-invalid": presence(textAreaState.finalInvalid),
        class: styles
      },
      { ...rest, class: className }
    )
  );
</script>

<textarea
  bind:this={ref}
  bind:value={getValue, setValue}
  {...textAreaProps}
  oninput={handlers.handleInput}
  oninvalid={handlers.handleInvalid}
></textarea>
