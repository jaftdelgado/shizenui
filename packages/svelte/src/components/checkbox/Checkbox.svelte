<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { CheckboxProps } from "./_internal/index.js";
  import { createCheckboxState, createCheckboxHandlers } from "./_internal/index.js";
  import { createFocusVisible } from "../../shared/focus-visible.svelte.js";

  let {
    class: className,
    value,
    disabled = false,
    invalid = false,
    name,
    id = `checkbox-${Math.random().toString(36).slice(2, 9)}`,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    onCheckedChange,
    onIndeterminateChange,
    onclick,
    children,
    ...rest
  }: CheckboxProps = $props();

  const cbState = createCheckboxState({
    get value() {
      return value;
    },
    get disabled() {
      return disabled;
    },
    get invalid() {
      return invalid;
    },
    get name() {
      return name;
    },
    get id() {
      return id;
    },
    get checked() {
      return checked;
    },
    get indeterminate() {
      return indeterminate;
    }
  });

  const handlers = createCheckboxHandlers(
    cbState,
    () => checked,
    (val) => {
      checked = val;
    },
    () => indeterminate,
    (val) => {
      indeterminate = val;
    },
    (val) => onCheckedChange?.(val),
    (val) => onIndeterminateChange?.(val)
  );

  const focus = createFocusVisible();

  function handleClick(e: MouseEvent) {
    handlers.handleContainerClick(e);
    onclick?.(e);
  }
</script>

<div
  class={cn(cbState.styles.base(), className)}
  data-state={cbState.checkboxState}
  data-disabled={cbState.finalDisabled ? "" : undefined}
  data-invalid={cbState.finalInvalid ? "" : undefined}
  data-focus-visible={focus.isFocusVisible ? "" : undefined}
  onmousedown={focus.onWrapperMouseDown}
  onclick={handleClick}
  role="none"
>
  <input
    bind:this={cbState.inputElement}
    type="checkbox"
    {value}
    name={cbState.activeName}
    {id}
    aria-checked={cbState.isIndeterminate ? "mixed" : cbState.isChecked}
    checked={cbState.isChecked}
    disabled={cbState.finalDisabled}
    class="checkbox__input"
    tabindex={!cbState.finalDisabled ? 0 : -1}
    onchange={handlers.handleChange}
    onkeydown={handlers.handleKeyEnter}
    onkeyup={handlers.handleKeyEnter}
    onmousedown={focus.onInputMouseDown}
    onfocus={focus.onFocus}
    onblur={focus.onBlur}
    {...rest}
  />
  {@render children()}
</div>
