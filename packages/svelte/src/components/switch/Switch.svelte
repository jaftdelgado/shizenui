<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { SwitchProps } from "./_internal/index.js";
  import {
    SwitchState,
    createSwitchHandlers,
    setupSwitchContexts,
    useSwitchContext
  } from "./_internal/index.js";
  import { createFocusVisible, warnIf } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    class: className,
    disabled = undefined,
    readonly = undefined,
    name,
    value,
    id = createId("switch", uid),
    checked = $bindable(false),
    size = "md",
    onCheckedChange,
    children,
    ...rest
  }: SwitchProps = $props();

  warnIf(
    () => !children,
    "Switch",
    "No children provided. Add at least <Switch.Control /> as a child."
  );

  warnIf(
    () => !!value && !name,
    "Switch",
    "A 'value' prop was provided without a 'name' prop. The switch won't be included in form submissions."
  );

  let inputEl = $state<HTMLInputElement | null>(null);

  const switchState = new SwitchState({
    disabled: () => disabled,
    readonly: () => readonly,
    size: () => size
  });

  setupSwitchContexts(switchState, {
    checked: () => checked,
    id: () => id
  });

  const ctx = useSwitchContext();

  warnIf(
    () => !!children && !ctx.hasContent && !rest["aria-label"],
    "Switch",
    "No Switch.Content found. Add <Switch.Content> with a <Label> inside, or pass aria-label directly."
  );

  const handlers = createSwitchHandlers({
    state: switchState,
    getChecked: () => checked,
    setChecked: (val) => {
      checked = val;
    },
    onCheckedChange: (val) => onCheckedChange?.(val),
    getInputRef: () => inputEl
  });

  const focus = createFocusVisible();

  const styles = $derived(switchStyles({ size: switchState.finalSize }));
</script>

<div
  role="none"
  class={cn(styles.base(), className)}
  data-disabled={presence(switchState.finalDisabled)}
  data-readonly={presence(switchState.finalReadonly)}
  data-checked={presence(checked)}
  data-focus-visible={presence(focus.isFocusVisible)}
  onmousedown={focus.onMouseDown}
  onclick={handlers.handleContainerClick}
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
    aria-readonly={switchState.finalReadonly ? true : undefined}
    aria-labelledby={ctx.hasContent ? `${id}-label` : undefined}
    aria-describedby={ctx.hasDescription ? `${id}-description` : undefined}
    onchange={handlers.handleToggle}
    onkeydown={(e) => {
      focus.onKeyDown();
      handlers.handleKey(e);
    }}
    onkeyup={handlers.handleKey}
    onfocus={focus.onFocus}
    onblur={focus.onBlur}
    {...rest}
  />
  {@render children?.({
    isChecked: checked,
    isDisabled: switchState.finalDisabled,
    isReadonly: switchState.finalReadonly,
    isFocusVisible: focus.isFocusVisible
  })}
</div>
