<script lang="ts">
  import { checkboxStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { CheckboxProps } from "./_internal/index.js";
  import {
    CheckboxState,
    createCheckboxHandlers,
    setupCheckboxContexts,
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

  let hasInteracted = false;
  let baselineChecked = $state(checked);
  let baselineIndeterminate = $state(indeterminate);
  let submissionInvalid = $state(false);

  $effect(() => {
    if (hasInteracted) return;
    baselineChecked = checked;
    baselineIndeterminate = indeterminate;
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
    submissionInvalid: () => submissionInvalid,
    value: () => value,
    name: () => name,
    id: () => id
  });

  $effect(() => {
    if (checkboxState.isChecked) {
      submissionInvalid = false;
    }
  });

  setupCheckboxContexts(checkboxState);

  const ctx = useCheckboxContext();

  warnIf(
    () => !ctx.hasLabel && !rest["aria-label"] && !rest["aria-labelledby"],
    "Checkbox",
    "No accessible name found. Add a <Label> (typically inside <Checkbox.Content>), or pass aria-label/aria-labelledby directly."
  );

  warnIf(
    () => !!ref && !checkboxState.name && !!ref.closest("form"),
    "Checkbox",
    "This checkbox is inside a <form> but no `name` was provided — it will not participate in native form submission."
  );

  function setChecked(next: boolean): void {
    hasInteracted = true;
    checked = next;
    onCheckedChange?.(next);
  }

  function setIndeterminate(next: boolean): void {
    hasInteracted = true;
    indeterminate = next;
    onIndeterminateChange?.(next);
  }

  const handlers = createCheckboxHandlers({
    state: checkboxState,
    setChecked,
    setIndeterminate,
    getOnClick: () => onclick
  });

  const focus = createFocusVisible();
  const styles = $derived(checkboxStyles());

  const describedBy = $derived(
    [
      ctx.hasError ? `${id}-error` : null,
      !ctx.hasError && ctx.hasDescription ? `${id}-description` : null
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );

  let hiddenInputRef: HTMLInputElement | null = $state(null);

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      checked = baselineChecked;
      indeterminate = baselineIndeterminate;
      submissionInvalid = false;
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
  class={cn(styles.base(), className)}
  data-checked={presence(checkboxState.isChecked)}
  data-indeterminate={presence(checkboxState.isIndeterminate)}
  data-disabled={presence(checkboxState.finalDisabled)}
  data-readonly={presence(checkboxState.finalReadonly)}
  data-invalid={presence(checkboxState.finalInvalid)}
  data-focus-visible={presence(focus.isFocusVisible)}
  onclick={handlers.handleClick}
  onkeydown={(e) => {
    focus.onKeyDown();
    handlers.handleKeydown(e);
  }}
  onkeyup={handlers.handleKeydown}
  onmousedown={(e) => {
    focus.onMouseDown();
    handlers.handleMouseDown(e);
  }}
  onmouseup={handlers.handleMouseUp}
  onmouseleave={handlers.handleMouseLeave}
  onfocus={focus.onFocus}
  onblur={focus.onBlur}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</button>

{#if checkboxState.name}
  <input
    bind:this={hiddenInputRef}
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
      submissionInvalid = true;
      ref?.focus();
    }}
  />
{/if}
