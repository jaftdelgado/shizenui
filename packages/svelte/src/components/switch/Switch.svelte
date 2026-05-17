<script lang="ts">
  import { cn, createId } from "../../lib/utils/index.js";
  import { switchStyles } from "@shizen-ui/styles";
  import type { SwitchProps } from "./_internal/index.js";
  import { SwitchState, createSwitchHandlers } from "./_internal/index.js";
  import { createFocusVisible, warnIf } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    class: className,
    disabled = false,
    invalid = false,
    name,
    value,
    id = createId("switch", uid),
    checked = $bindable(false),
    size = "md",
    onCheckedChange,
    onclick,
    children,
    ...rest
  }: SwitchProps = $props();

  warnIf(
    () => !children,
    "Switch",
    "No children provided. Add at least <Switch.Control /> as a child."
  );

  const state = new SwitchState({
    disabled: () => disabled,
    invalid: () => invalid,
    size: () => size,
    id: () => id,
    checked: () => checked
  });

  const handlers = createSwitchHandlers(
    state,
    () => checked,
    (val) => {
      checked = val;
    },
    (val) => onCheckedChange?.(val)
  );

  const focus = createFocusVisible();

  const styles = $derived(switchStyles({ size: state.finalSize }));

  function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    handlers.handleContainerClick(e);
    onclick?.(e);
  }

  function handleKeyDown(e: KeyboardEvent) {
    focus.onKeyDown();
    handlers.handleKey(e);
  }
</script>

<div
  class={cn(styles.base(), className)}
  data-disabled={state.finalDisabled ? "" : undefined}
  data-invalid={state.finalInvalid ? "" : undefined}
  data-checked={checked ? "" : undefined}
  data-focus-visible={focus.isFocusVisible ? "" : undefined}
  onmousedown={focus.onMouseDown}
  onclick={handleClick}
  role="none"
>
  <input
    type="checkbox"
    role="switch"
    {name}
    {value}
    {id}
    {checked}
    disabled={state.finalDisabled}
    class="switch__input"
    tabindex={!state.finalDisabled ? 0 : -1}
    aria-checked={checked}
    onchange={handlers.handleChange}
    onkeydown={handleKeyDown}
    onkeyup={handlers.handleKey}
    onfocus={focus.onFocus}
    onblur={focus.onBlur}
    {...rest}
  />
  {@render children?.()}
</div>
