<script lang="ts">
  import { radioGroupStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import type { RadioGroupProps } from "./_internal/index.js";
  import {
    RadioGroupState,
    focusFirstRadio,
    resolveRadioGroupDescribedBy,
    setupRadioGroupForm,
    setupRadioGroupContexts,
    setupRadioGroupWarnings,
    useRadioGroupContext
  } from "./_internal/index.js";
  import { SubmissionInvalidState, syncFormReset } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    value = $bindable(),
    onValueChange,
    name = undefined,
    disabled = undefined,
    readonly = undefined,
    invalid = undefined,
    required = undefined,
    variant = undefined,
    orientation = "vertical",
    id = createId("radio-group", uid),
    ref = $bindable(null),
    ...rest
  }: RadioGroupProps = $props();

  let isInternalWrite = false;
  let baselineValue = $state(value);
  let submissionInvalid: SubmissionInvalidState;

  $effect(() => {
    const v = value;

    if (isInternalWrite) {
      isInternalWrite = false;
      return;
    }

    baselineValue = v;
  });

  const radioGroupState = new RadioGroupState({
    value: () => value,
    onValueChange: () => onValueChange,
    name: () => name,
    disabled: () => disabled,
    readonly: () => readonly,
    invalid: () => invalid,
    submissionInvalid: () => submissionInvalid.value,
    required: () => required,
    variant: () => variant,
    orientation: () => orientation,
    id: () => id,
    setValue: (v) => {
      isInternalWrite = true;
      value = v;
    },
    setSubmissionInvalid: (next) => {
      submissionInvalid.set(next);
    }
  });

  setupRadioGroupContexts(radioGroupState);

  const ctx = useRadioGroupContext();

  submissionInvalid = setupRadioGroupForm({
    state: radioGroupState,
    getRef: () => ref
  });

  setupRadioGroupWarnings({
    context: ctx,
    hasChildren: () => Boolean(children),
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  const styles = $derived(
    radioGroupStyles({ orientation: radioGroupState.finalOrientation })
  );

  const describedBy = $derived(resolveRadioGroupDescribedBy(ctx));

  const groupProps = $derived(
    mergeProps(
      {
        id,
        role: "radiogroup",
        class: styles.base(),
        "aria-labelledby": ctx.hasLabel ? ctx.labelId : undefined,
        "aria-describedby": describedBy,
        "aria-invalid": radioGroupState.finalInvalid ? true : undefined,
        "aria-disabled": radioGroupState.finalDisabled ? true : undefined,
        "aria-readonly": radioGroupState.finalReadonly ? true : undefined,
        "aria-required": radioGroupState.finalRequired ? true : undefined,
        "data-invalid": presence(radioGroupState.finalInvalid),
        "data-disabled": presence(radioGroupState.finalDisabled),
        "data-readonly": presence(radioGroupState.finalReadonly),
        "data-orientation": radioGroupState.finalOrientation
      },
      { ...rest, class: className }
    )
  );

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      submissionInvalid.clear();
      isInternalWrite = true;
      value = baselineValue;
      onValueChange?.(baselineValue);
    }
  });
</script>

<div bind:this={ref} {...groupProps}>
  {#if radioGroupState.finalRequired && !radioGroupState.finalName}
    <input
      type="radio"
      class="radio-group__input"
      tabindex={-1}
      aria-hidden="true"
      checked={radioGroupState.hasSelection}
      disabled={radioGroupState.finalDisabled}
      required
      oninvalid={(e) => {
        e.preventDefault();
        submissionInvalid.set(true);
        focusFirstRadio({ container: ref, setActiveId: ctx.setActiveId });
      }}
    />
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
