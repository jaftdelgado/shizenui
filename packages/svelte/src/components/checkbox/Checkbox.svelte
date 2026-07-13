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
  import { createFocusVisible, warnIf } from "../../lib/runes/index.js";

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

  warnIf(
    () => !children,
    "Checkbox",
    "No children provided. Add at least <Checkbox.Control /> as a child."
  );

  const state = new CheckboxState({
    checked: () => checked,
    indeterminate: () => indeterminate,
    disabled: () => disabled,
    invalid: () => invalid,
    readonly: () => readonly,
    required: () => required,
    value: () => value,
    name: () => name,
    id: () => id
  });

  setupCheckboxContexts(state);

  const ctx = useCheckboxContext();

  warnIf(
    () => !!children && !ctx.hasLabel && !rest["aria-label"],
    "Checkbox",
    "No Label found. Add a <Label> (typically inside <Checkbox.Content>), or pass aria-label directly."
  );

  function setChecked(next: boolean): void {
    checked = next;
    onCheckedChange?.(next);
  }

  function setIndeterminate(next: boolean): void {
    indeterminate = next;
    onIndeterminateChange?.(next);
  }

  const handlers = createCheckboxHandlers({
    state,
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
</script>

<button
  bind:this={ref}
  type="button"
  role="checkbox"
  {id}
  disabled={state.finalDisabled}
  aria-checked={state.isIndeterminate ? "mixed" : state.isChecked}
  aria-disabled={state.finalDisabled ? true : undefined}
  aria-invalid={state.finalInvalid ? true : undefined}
  aria-readonly={state.finalReadonly ? true : undefined}
  aria-required={state.finalRequired ? true : undefined}
  aria-labelledby={ctx.hasLabel ? `${id}-label` : undefined}
  aria-describedby={describedBy}
  tabindex={!state.finalDisabled ? 0 : -1}
  class={cn(styles.base(), className)}
  data-checked={presence(state.isChecked)}
  data-indeterminate={presence(state.isIndeterminate)}
  data-disabled={presence(state.finalDisabled)}
  data-readonly={presence(state.finalReadonly)}
  data-invalid={presence(state.finalInvalid)}
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

{#if state.name}
  <input
    type="checkbox"
    hidden
    tabindex={-1}
    aria-hidden="true"
    name={state.name}
    value={state.value ?? "on"}
    checked={state.isChecked}
    disabled={state.finalDisabled}
    required={state.finalRequired}
  />
{/if}
