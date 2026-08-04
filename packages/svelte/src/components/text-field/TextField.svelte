<script lang="ts">
  import { textFieldStyles } from "@shizen-ui/styles";

  import { syncFormReset, warnIf } from "../../lib/runes/index.js";
  import type { SubmissionInvalidState } from "../../lib/runes/index.js";
  import { cn, createId, presence } from "../../lib/utils";
  import type { TextFieldProps } from "./_internal/index.js";
  import {
    TextFieldState,
    setupTextFieldContexts,
    setupTextFieldSubmissionInvalid,
    useTextFieldContext,
    warnIfTextFieldHasNoAccessibleName
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    disabled = undefined,
    invalid = undefined,
    readonly = undefined,
    required = undefined,
    value = $bindable(""),
    size = undefined,
    variant = undefined,
    id = createId("text-field", uid),
    ref = $bindable(null),
    children,
    ...rest
  }: TextFieldProps = $props();

  warnIf(
    () => !children,
    "TextField",
    "No children provided. Add a <Label /> and either <Input /> or <InputGroup />."
  );

  let submissionInvalid: SubmissionInvalidState;

  const state = new TextFieldState({
    disabled: () => disabled,
    invalid: () => invalid,
    readonly: () => readonly,
    required: () => required,
    value: () => value,
    setValue: (next) => (value = next),
    size: () => size,
    variant: () => variant,
    id: () => id,
    submissionInvalid: () => submissionInvalid.value,
    setSubmissionInvalid: (next) => submissionInvalid.set(next)
  });

  submissionInvalid = setupTextFieldSubmissionInvalid(state);

  setupTextFieldContexts(state);

  const ctx = useTextFieldContext();
  const styles = textFieldStyles();

  warnIfTextFieldHasNoAccessibleName(ctx);

  syncFormReset({
    getRef: () => ctx.control,
    onReset: () => state.resetValidation()
  });
</script>

<div
  bind:this={ref}
  data-disabled={presence(state.finalDisabled)}
  data-readonly={presence(state.finalReadonly)}
  data-invalid={presence(state.finalInvalid)}
  data-required={presence(state.finalRequired)}
  class={cn(styles, className)}
  {...rest}
  data-slot="field"
>
  {@render children?.()}
</div>
