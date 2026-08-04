<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { syncFormReset, warnIf } from "../../lib/runes/index.js";
  import type { SubmissionInvalidState } from "../../lib/runes/index.js";
  import { cn, presence } from "../../lib/utils";
  import {
    useTextFieldContext,
    warnIfTextFieldPropsOverride
  } from "../text-field/_internal/index.js";
  import type { InputGroupProps } from "./_internal/index.js";
  import {
    InputGroupState,
    setupInputGroupContexts,
    setupInputGroupSubmissionInvalid,
    useInputGroupContext,
    createInputGroupHandlers
  } from "./_internal/index.js";

  let {
    class: className,
    disabled = undefined,
    invalid = undefined,
    readonly = undefined,
    required = undefined,
    variant = undefined,
    size = undefined,
    id = undefined,
    ref = $bindable(null),
    children,
    ...rest
  }: InputGroupProps = $props();

  warnIf(
    () => !children,
    "InputGroup",
    "No children provided. Add at least <InputGroup.Input /> or <InputGroup.TextArea />."
  );

  let submissionInvalid: SubmissionInvalidState;

  const state = new InputGroupState({
    disabled: () => disabled,
    invalid: () => invalid,
    readonly: () => readonly,
    required: () => required,
    variant: () => variant,
    size: () => size,
    id: () => id,
    submissionInvalid: () => submissionInvalid.value,
    setSubmissionInvalid: (next) => submissionInvalid.set(next)
  });

  submissionInvalid = setupInputGroupSubmissionInvalid(state);

  setupInputGroupContexts(state);

  const ctx = useInputGroupContext();
  const textFieldCtx = useTextFieldContext();

  warnIfTextFieldPropsOverride({
    component: "InputGroup",
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

  const handlers = createInputGroupHandlers({
    getInputRef: () => ctx.inputRef,
    getDisabled: () => ctx.disabled
  });

  const styles = $derived(inputGroupStyles({ variant: ctx.variant, size: ctx.size }));

  syncFormReset({
    getRef: () => ctx.inputRef,
    onReset: () => state.resetValidation()
  });
</script>

<div
  bind:this={ref}
  role="presentation"
  {id}
  data-disabled={presence(ctx.disabled)}
  data-readonly={presence(ctx.readonly)}
  data-invalid={presence(ctx.invalid)}
  class={cn(styles.base(), className)}
  onclick={handlers.handleContainerClick}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</div>
