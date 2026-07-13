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
    id = createId("radio", uid),
    ref = $bindable(null),
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
    id: () => id
  });

  setupRadioContexts(state);
  setupRadioGroupRegistration(state);

  const ctx = useRadioContext();

  warnIf(
    () => !!children && !ctx.hasLabel && !rest["aria-label"],
    "Radio",
    "No Label found. Add a <Label> (typically inside <Radio.Content>), or pass aria-label directly."
  );

  const handlers = createRadioHandlers({
    state,
    getOnClick: () => onclick
  });

  const focus = createFocusVisible();

  const styles = $derived(radioStyles());

  const describedBy = $derived(
    [
      ctx.hasDescription ? `${id}-description` : null,
      state.groupCtx.exists && state.groupCtx.hasError ? state.groupCtx.errorId : null,
      state.groupCtx.exists && !state.groupCtx.hasError && state.groupCtx.hasDescription
        ? state.groupCtx.descriptionId
        : null
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );
</script>

<button
  bind:this={ref}
  type="button"
  role="radio"
  {id}
  disabled={state.finalDisabled}
  aria-checked={state.isChecked}
  aria-disabled={state.finalDisabled ? true : undefined}
  aria-labelledby={ctx.hasLabel ? `${id}-label` : undefined}
  aria-describedby={describedBy}
  tabindex={state.groupCtx.isActive(id) ? 0 : -1}
  class={cn(styles.base(), className)}
  data-checked={presence(state.isChecked)}
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
