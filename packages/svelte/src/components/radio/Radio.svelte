<script lang="ts">
  import { radioStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { RadioProps } from "./_internal/index.js";
  import {
    RadioState,
    createRadioHandlers,
    setupRadioContexts,
    setupRadioGroupRegistration,
    useRadioContext
  } from "./_internal/index.js";
  import { createFocusVisible, warnIf } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    class: className,
    value,
    disabled = undefined,
    readonly = undefined,
    invalid = undefined,
    name,
    id = createId("radio", uid),
    checked = $bindable(false),
    ref = $bindable(null),
    onCheckedChange,
    onclick,
    children,
    ...rest
  }: RadioProps = $props();

  warnIf(
    () => !children,
    "Radio",
    "No children provided. Add at least <Radio.Control /> as a child."
  );

  const state = new RadioState({
    value: () => value,
    disabled: () => disabled,
    readonly: () => readonly,
    invalid: () => invalid,
    name: () => name,
    id: () => id,
    checked: () => checked
  });

  setupRadioContexts(state);
  setupRadioGroupRegistration(state, () => ref);

  const ctx = useRadioContext();

  warnIf(
    () => !state.groupCtx.exists && !name,
    "Radio",
    "No 'name' prop provided and not inside a <RadioGroup>. The radio won't be grouped correctly for form submission."
  );

  warnIf(
    () => !!children && !ctx.hasContent && !rest["aria-label"],
    "Radio",
    "No Radio.Content found. Add <Radio.Content> with a <Label> inside, or pass aria-label directly."
  );

  const handlers = createRadioHandlers({
    state,
    setChecked: (val) => {
      checked = val;
    },
    onCheckedChange: (val) => onCheckedChange?.(val),
    getOnClick: () => onclick,
    getInputRef: () => ref
  });

  const focus = createFocusVisible();

  const styles = $derived(radioStyles());
</script>

<div
  role="none"
  class={cn(styles.base(), className)}
  data-checked={presence(state.isChecked)}
  data-disabled={presence(state.finalDisabled)}
  data-readonly={presence(state.finalReadonly)}
  data-invalid={presence(state.finalInvalid)}
  data-focus-visible={presence(focus.isFocusVisible)}
  onmousedown={focus.onMouseDown}
  onclick={handlers.handleClick}
>
  <input
    bind:this={ref}
    type="radio"
    {value}
    name={state.activeName}
    {id}
    checked={state.isChecked}
    disabled={state.finalDisabled}
    class={styles.input()}
    tabindex={state.isChecked || !state.groupCtx.exists || !state.groupCtx.value ? 0 : -1}
    aria-checked={state.isChecked}
    aria-labelledby={ctx.hasContent ? `${id}-label` : undefined}
    aria-describedby={ctx.hasDescription ? `${id}-description` : undefined}
    onchange={handlers.handleChange}
    onkeydown={handlers.handleKeyEnter}
    onkeyup={handlers.handleKeyEnter}
    onfocus={focus.onFocus}
    onblur={focus.onBlur}
    {...rest}
  />
  {@render children()}
</div>
