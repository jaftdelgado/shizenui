<script lang="ts">
  import { checkboxGroupStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import type { CheckboxGroupProps } from "./_internal/index.js";
  import {
    CheckboxGroupState,
    resolveCheckboxGroupDescribedBy,
    setupCheckboxGroupContexts,
    setupCheckboxGroupWarnings,
    useCheckboxGroupContext
  } from "./_internal/index.js";
  import {
    SubmissionInvalidState,
    syncFormReset,
    syncNativeCheckedReset
  } from "../../lib/runes/index.js";

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
    id = createId("checkbox-group", uid),
    ref = $bindable(null),
    ...rest
  }: CheckboxGroupProps = $props();

  let isInternalWrite = false;
  let baselineValue = $state<string[]>([...(value ?? [])]);
  let nativeInputRef = $state<HTMLInputElement | null>(null);
  let submissionInvalid: SubmissionInvalidState;

  $effect(() => {
    const v = value;

    if (isInternalWrite) {
      isInternalWrite = false;
      return;
    }

    baselineValue = [...(v ?? [])];
  });

  const checkboxGroupState = new CheckboxGroupState({
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
    }
  });

  submissionInvalid = new SubmissionInvalidState(() => checkboxGroupState.finalValue.length > 0);

  setupCheckboxGroupContexts(checkboxGroupState);

  const ctx = useCheckboxGroupContext();

  setupCheckboxGroupWarnings({
    context: ctx,
    hasChildren: () => Boolean(children),
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  const styles = $derived(
    checkboxGroupStyles({ orientation: checkboxGroupState.finalOrientation })
  );

  const describedBy = $derived(resolveCheckboxGroupDescribedBy(ctx));

  const groupProps = $derived(
    mergeProps(
      {
        id,
        role: "group",
        class: styles.base(),
        "aria-labelledby": ctx.hasLabel ? ctx.labelId : undefined,
        "aria-describedby": describedBy,
        "aria-disabled": checkboxGroupState.finalDisabled ? true : undefined,
        "aria-required": checkboxGroupState.finalRequired ? true : undefined,
        "aria-invalid": checkboxGroupState.finalInvalid ? true : undefined,
        "aria-readonly": checkboxGroupState.finalReadonly ? true : undefined,
        "data-checkbox-group": "",
        "data-invalid": presence(checkboxGroupState.finalInvalid),
        "data-disabled": presence(checkboxGroupState.finalDisabled),
        "data-readonly": presence(checkboxGroupState.finalReadonly),
        "data-orientation": checkboxGroupState.finalOrientation
      },
      { ...rest, class: className }
    )
  );

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      submissionInvalid.clear();
      const resetValue = [...baselineValue];

      syncNativeCheckedReset(nativeInputRef, resetValue.length > 0);

      isInternalWrite = true;
      value = resetValue;
      onValueChange?.(value);
    },
    onResetComplete: () => {
      syncNativeCheckedReset(nativeInputRef, baselineValue.length > 0);
    }
  });
</script>

<!-- svelte-ignore a11y_role_supports_aria_props -->
<div bind:this={ref} {...groupProps}>
  {#if children}
    {@render children()}
  {/if}

  {#if checkboxGroupState.finalRequired}
    <input
      bind:this={nativeInputRef}
      type="checkbox"
      class={styles.input()}
      tabindex={-1}
      aria-hidden="true"
      checked={checkboxGroupState.finalValue.length > 0}
      disabled={checkboxGroupState.finalDisabled}
      required
      oninvalid={(e) => {
        e.preventDefault();
        submissionInvalid.set(true);
        ref?.querySelector<HTMLButtonElement>('[role="checkbox"]:not([data-disabled])')?.focus();
      }}
    />
  {/if}
</div>
