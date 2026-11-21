<script lang="ts">
  import { checkboxStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import type { CheckboxProps } from "./_internal/index.js";
  import {
    CheckboxState,
    createCheckboxHandlers,
    resolveCheckboxDescribedBy,
    setupCheckboxContexts,
    setupCheckboxFormWarnings,
    setupCheckboxWarnings,
    useCheckboxContext
  } from "./_internal/index.js";
  import {
    createFocusVisible,
    PressState,
    syncFormReset,
    syncNativeCheckedReset
  } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    class: className,
    value,
    name,
    disabled = undefined,
    invalid = undefined,
    readonly = undefined,
    required = undefined,
    variant = undefined,
    id = createId("checkbox", uid),
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    onCheckedChange,
    onIndeterminateChange,
    onclick,
    children,
    ...rest
  }: CheckboxProps = $props();

  let isInternalWrite = false;
  let baselineChecked = $state(checked);
  let baselineIndeterminate = $state(indeterminate);
  let nativeInputRef = $state<HTMLInputElement | null>(null);

  $effect(() => {
    const c = checked;
    const ind = indeterminate;

    if (isInternalWrite) {
      isInternalWrite = false;
      return;
    }

    baselineChecked = c;
    baselineIndeterminate = ind;
  });

  const checkboxState = new CheckboxState({
    checked: () => checked,
    indeterminate: () => indeterminate,
    disabled: () => disabled,
    invalid: () => invalid,
    readonly: () => readonly,
    required: () => required,
    variant: () => variant,
    submissionInvalid: () => submissionInvalid.value,
    value: () => value,
    name: () => name,
    id: () => id
  });

  setupCheckboxContexts(checkboxState);

  const ctx = useCheckboxContext();

  const submissionInvalid = setupCheckboxFormWarnings({
    state: checkboxState,
    getRef: () => ref
  });

  setupCheckboxWarnings({
    state: checkboxState,
    context: ctx,
    hasChildren: () => Boolean(children),
    getValue: () => value,
    getVariant: () => variant,
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  function setChecked(next: boolean): void {
    isInternalWrite = true;
    checked = next;
    onCheckedChange?.(next);
  }

  function setIndeterminate(next: boolean): void {
    isInternalWrite = true;
    indeterminate = next;
    onIndeterminateChange?.(next);
  }

  const focus = createFocusVisible();
  // The ARIA checkbox pattern activates with Space only: Enter is cancelled and does nothing.
  const press = new PressState({
    isDisabled: () => checkboxState.finalDisabled || checkboxState.finalReadonly,
    keys: [" "]
  });
  // `blur` has a handler in each: mergeProps composes them, PressState's first.
  const pressProps = mergeProps(press.props, { onblur: focus.onBlur });

  const handlers = createCheckboxHandlers({
    state: checkboxState,
    setChecked,
    setIndeterminate,
    getOnClick: () => onclick
  });

  const styles = $derived(checkboxStyles({ variant: checkboxState.finalVariant }));

  const describedBy = $derived(resolveCheckboxDescribedBy(checkboxState, ctx, id));

  const buttonProps = $derived(
    mergeProps(
      {
        type: "button" as const,
        role: "checkbox",
        id,
        disabled: checkboxState.finalDisabled,
        "aria-checked": checkboxState.isIndeterminate ? "mixed" : checkboxState.isChecked,
        "aria-disabled": checkboxState.finalDisabled ? true : undefined,
        "aria-invalid": checkboxState.finalInvalid ? true : undefined,
        "aria-readonly": checkboxState.finalReadonly ? true : undefined,
        "aria-required": checkboxState.finalRequired ? true : undefined,
        ...(ctx.hasLabel ? { "aria-labelledby": `${id}-label` } : {}),
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        tabindex: !checkboxState.finalDisabled ? 0 : -1,
        "data-checked": presence(checkboxState.isChecked),
        "data-indeterminate": presence(checkboxState.isIndeterminate),
        "data-disabled": presence(checkboxState.finalDisabled),
        "data-readonly": presence(checkboxState.finalReadonly),
        "data-invalid": presence(checkboxState.finalInvalid),
        "data-focus-visible": presence(focus.isFocusVisible),
        "data-pressed": presence(press.isPressed),
        ...pressProps,
        onclick: handlers.handleClick,
        onfocus: focus.onFocus,
        class: styles.base()
      },
      { ...rest, class: className }
    )
  );

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      submissionInvalid.clear();

      syncNativeCheckedReset(nativeInputRef, checkboxState.isChecked, false);

      if (checkboxState.groupCtx.exists) return;
      checked = baselineChecked;
      indeterminate = baselineIndeterminate;
    },
    onResetComplete: () => {
      syncNativeCheckedReset(nativeInputRef, checkboxState.isChecked, false);
    }
  });
</script>

<button bind:this={ref} {...buttonProps}>
  {#if children}
    {@render children()}
  {/if}
</button>

{#if checkboxState.name || checkboxState.finalRequired}
  <input
    bind:this={nativeInputRef}
    type="checkbox"
    class={styles.input()}
    tabindex={-1}
    aria-hidden="true"
    name={checkboxState.name}
    value={checkboxState.value ?? "on"}
    checked={checkboxState.isChecked}
    disabled={checkboxState.finalDisabled}
    required={checkboxState.finalRequired}
    oninvalid={(e) => {
      e.preventDefault();
      submissionInvalid.set(true);
      ref?.focus();
    }}
  />
{/if}
