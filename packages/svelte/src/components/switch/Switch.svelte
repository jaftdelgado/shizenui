<script lang="ts">
  import { cn, createId } from "../../lib/utils/index.js";
  import { switchStyles } from "@shizen-ui/styles";
  import type { SwitchProps } from "./_internal/index.js";
  import { SwitchState, createSwitchHandlers } from "./_internal/index.js";
  import { createFocusVisible, warnIf } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    class: className,
    disabled = undefined,
    invalid = undefined,
    name,
    value,
    id = createId("switch", uid),
    checked = $bindable(false),
    size = "md",
    onCheckedChange,
    onclick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    children,
    ...rest
  }: SwitchProps = $props();

  warnIf(
    () => !children,
    "Switch",
    "No children provided. Add at least <Switch.Control /> as a child."
  );

  let inputEl = $state<HTMLInputElement | null>(null);

  const switchState = new SwitchState({
    disabled: () => disabled,
    invalid: () => invalid,
    size: () => size,
    id: () => id,
    checked: () => checked
  });

  const handlers = createSwitchHandlers(
    switchState,
    () => checked,
    (val) => {
      checked = val;
    },
    (val) => onCheckedChange?.(val),
    () => inputEl
  );

  const focus = createFocusVisible();

  const styles = $derived(switchStyles({ size: switchState.finalSize }));

  function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    handlers.handleContainerClick(e);
    onclick?.(e);
  }

  function handleKeyDown(e: KeyboardEvent) {
    focus.onKeyDown();
    handlers.handleKey(e);
    onKeyDown?.(e);
  }

  function handleKeyUp(e: KeyboardEvent) {
    handlers.handleKey(e);
    onKeyUp?.(e);
  }

  function handleFocus(e: FocusEvent) {
    focus.onFocus();
    onFocus?.(e);
  }

  function handleBlur(e: FocusEvent) {
    focus.onBlur();
    onBlur?.(e);
  }
</script>

<div
  role="none"
  class={cn(styles.base(), className)}
  data-disabled={switchState.finalDisabled ? "" : undefined}
  data-invalid={switchState.finalInvalid ? "" : undefined}
  data-checked={checked ? "" : undefined}
  data-focus-visible={focus.isFocusVisible ? "" : undefined}
  onmousedown={focus.onMouseDown}
  onclick={handleClick}
>
  <input
    bind:this={inputEl}
    type="checkbox"
    role="switch"
    {name}
    {value}
    {id}
    {checked}
    disabled={switchState.finalDisabled}
    class={styles.input()}
    tabindex={!switchState.finalDisabled ? 0 : -1}
    aria-checked={checked}
    aria-invalid={switchState.finalInvalid ? true : undefined}
    aria-labelledby={`${id}-label`}
    aria-describedby={`${id}-description`}
    onchange={handlers.handleChange}
    onkeydown={handleKeyDown}
    onkeyup={handleKeyUp}
    onfocus={handleFocus}
    onblur={handleBlur}
    {...rest}
  />
  {@render children?.()}
</div>
