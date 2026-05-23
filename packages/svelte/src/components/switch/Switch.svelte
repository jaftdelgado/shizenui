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
    invalid = undefined,
    name,
    value,
    id = createId("switch", uid),
    checked = $bindable(false),
    size = "md",
    onKeyDown,
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
    invalid: () => invalid,
    size: () => size
  });

  setupSwitchContexts(switchState, {
    checked: () => checked,
    id: () => id
  });

  const ctx = useSwitchContext();

  warnIf(
    () =>
      !!children &&
      !ctx.hasContent &&
      !rest["aria-label"] &&
      !rest["aria-labelledby"] &&
      !rest.title,
    "Switch",
    "No Switch.Content found. Consider adding aria-label for screen reader support."
  );

  warnIf(
    () => ctx.hasDescription && !ctx.hasLabel,
    "Switch",
    "A <Description> was found inside <Switch.Content> without a <Label>. The description text will be announced twice by screen readers. Add a <Label> to fix this."
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
  data-invalid={presence(switchState.finalInvalid)}
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
    aria-invalid={switchState.finalInvalid ? true : undefined}
    aria-labelledby={ctx.hasLabel ? ctx.labelId : ctx.hasContent ? `${id}-label` : undefined}
    aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
    onchange={handlers.handleToggle}
    onkeydown={(e) => {
      focus.onKeyDown();
      handlers.handleKey(e);
      onKeyDown?.(e);
    }}
    onkeyup={handlers.handleKey}
    onfocus={focus.onFocus}
    onblur={focus.onBlur}
    {...rest}
  />
  {@render children?.({
    isChecked: checked,
    isDisabled: switchState.finalDisabled,
    isInvalid: switchState.finalInvalid,
    isFocusVisible: focus.isFocusVisible
  })}
</div>
