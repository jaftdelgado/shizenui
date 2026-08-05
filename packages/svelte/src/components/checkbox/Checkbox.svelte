<script lang="ts">
  import { checkboxStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { CheckboxProps } from "./_internal/index.js";
  import {
    CheckboxState,
    createCheckboxHandlers,
    resolveCheckboxDescribedBy,
    setupCheckboxContexts,
    setupCheckboxFormWarnings,
    useCheckboxContext
  } from "./_internal/index.js";
  import { createFocusVisible, warnIf, syncFormReset } from "../../lib/runes/index.js";

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

  warnIf(
    () => !children,
    "Checkbox",
    "No children provided. Add at least <Checkbox.Control /> as a child."
  );

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

  warnIf(
    () => checkboxState.groupCtx.exists && value === undefined,
    "Checkbox",
    "A Checkbox inside Checkbox.Group requires the `value` prop."
  );

  warnIf(
    () => checkboxState.groupCtx.exists && variant !== undefined,
    "Checkbox",
    "The local `variant` is ignored inside a CheckboxGroup. Set `variant` on CheckboxGroup instead."
  );

  warnIf(
    () => !ctx.hasLabel && !rest["aria-label"] && !rest["aria-labelledby"],
    "Checkbox",
    "No accessible name found. Add a <Label> (typically inside <Checkbox.Content>), or pass aria-label/aria-labelledby directly."
  );

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

  const handlers = createCheckboxHandlers({
    state: checkboxState,
    setChecked,
    setIndeterminate,
    focus,
    getOnClick: () => onclick
  });

  const styles = $derived(checkboxStyles({ variant: checkboxState.finalVariant }));

  const describedBy = $derived(resolveCheckboxDescribedBy(checkboxState, ctx, id));

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      submissionInvalid.clear();
      if (checkboxState.groupCtx.exists) return;
      checked = baselineChecked;
      indeterminate = baselineIndeterminate;
    }
  });
</script>

<button
  bind:this={ref}
  type="button"
  role="checkbox"
  {id}
  disabled={checkboxState.finalDisabled}
  aria-checked={checkboxState.isIndeterminate ? "mixed" : checkboxState.isChecked}
  aria-disabled={checkboxState.finalDisabled ? true : undefined}
  aria-invalid={checkboxState.finalInvalid ? true : undefined}
  aria-readonly={checkboxState.finalReadonly ? true : undefined}
  aria-required={checkboxState.finalRequired ? true : undefined}
  aria-labelledby={ctx.hasLabel ? `${id}-label` : undefined}
  aria-describedby={describedBy}
  tabindex={!checkboxState.finalDisabled ? 0 : -1}
  data-checked={presence(checkboxState.isChecked)}
  data-indeterminate={presence(checkboxState.isIndeterminate)}
  data-disabled={presence(checkboxState.finalDisabled)}
  data-readonly={presence(checkboxState.finalReadonly)}
  data-invalid={presence(checkboxState.finalInvalid)}
  data-focus-visible={presence(focus.isFocusVisible)}
  onclick={handlers.handleClick}
  onkeydown={handlers.handleKeydown}
  onkeyup={handlers.handleKeydown}
  onmousedown={handlers.handleMouseDown}
  onmouseup={handlers.handleMouseUp}
  onmouseleave={handlers.handleMouseLeave}
  onfocus={focus.onFocus}
  onblur={focus.onBlur}
  class={cn(styles.base(), className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</button>

{#if checkboxState.name || checkboxState.finalRequired}
  <input
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
