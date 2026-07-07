<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { RadioState, createRadioHandlers } from "./_internal/index.js";
  import type { RadioProps } from "./_internal/index.js";
  import { createFocusVisible } from "../../shared/focus-visible.svelte.js";

  let {
    class: className,
    value,
    disabled = false,
    invalid = false,
    name,
    id = crypto.randomUUID(),
    checked = $bindable(false),
    onclick,
    children,
    ...rest
  }: RadioProps = $props();

  const state = new RadioState({
    value: () => value,
    disabled: () => disabled,
    invalid: () => invalid,
    name: () => name,
    id: () => id,
    checked: () => checked
  });

  const handlers = createRadioHandlers(
    state,
    (val) => {
      checked = val;
    },
    () => onclick
  );

  const focus = createFocusVisible();
</script>

<div
  class={cn(state.styles.base(), className)}
  data-state={state.isChecked ? "checked" : "unchecked"}
  data-disabled={state.finalDisabled ? "" : undefined}
  data-invalid={state.finalInvalid ? "" : undefined}
  data-focus-visible={focus.isFocusVisible ? "" : undefined}
  onmousedown={focus.onWrapperMouseDown}
  onclick={handlers.handleClick}
  role="none"
>
  <input
    type="radio"
    {value}
    name={state.activeName}
    {id}
    checked={state.isChecked}
    disabled={state.finalDisabled}
    onchange={handlers.handleChange}
    onkeydown={handlers.handleKeyEnter}
    onkeyup={handlers.handleKeyEnter}
    class="radio__input"
    tabindex={state.isChecked || !state.groupCtx.exists || !state.groupCtx.value ? 0 : -1}
    onmousedown={focus.onInputMouseDown}
    onfocus={focus.onFocus}
    onblur={focus.onBlur}
    {...rest}
  />
  {@render children()}
</div>
