<script lang="ts">
  import { radioStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import type { RadioProps } from "./_internal/index.js";
  import { focusFirstRadio } from "../radio-group/_internal/index.js";
  import {
    RadioState,
    createRadioHandlers,
    resolveRadioDescribedBy,
    setupRadioContexts,
    setupRadioGroupRegistration,
    setupRadioWarnings,
    useRadioContext
  } from "./_internal/index.js";
  import { createFocusVisible } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    class: className,
    value,
    disabled = undefined,
    variant = undefined,
    id = createId("radio", uid),
    ref = $bindable(null),
    onclick,
    children,
    ...rest
  }: RadioProps = $props();

  const state = new RadioState({
    value: () => value,
    disabled: () => disabled,
    variant: () => variant,
    id: () => id
  });

  setupRadioContexts(state);
  setupRadioGroupRegistration(state);

  const ctx = useRadioContext();

  setupRadioWarnings({
    state,
    context: ctx,
    hasChildren: () => Boolean(children),
    getVariant: () => variant,
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  const focus = createFocusVisible();

  const handlers = createRadioHandlers({
    state,
    focus,
    getOnClick: () => onclick
  });

  const styles = $derived(radioStyles({ variant: state.finalVariant }));

  const describedBy = $derived(resolveRadioDescribedBy(state, ctx, id));

  const buttonProps = $derived(
    mergeProps(
      {
        type: "button" as const,
        role: "radio",
        id,
        disabled: state.finalDisabled,
        "aria-checked": state.isChecked,
        "aria-disabled": state.finalDisabled ? true : undefined,
        "aria-labelledby": ctx.hasLabel ? `${id}-label` : undefined,
        "aria-describedby": describedBy,
        tabindex: state.groupCtx.isActive(id) ? 0 : -1,
        "data-checked": presence(state.isChecked),
        "data-disabled": presence(state.finalDisabled),
        "data-readonly": presence(state.finalReadonly),
        "data-invalid": presence(state.finalInvalid),
        "data-focus-visible": presence(focus.isFocusVisible),
        onclick: handlers.handleClick,
        onkeydown: handlers.handleKeydown,
        onkeyup: handlers.handleKeydown,
        onmousedown: handlers.handleMouseDown,
        onmouseup: handlers.handleMouseUp,
        onmouseleave: handlers.handleMouseLeave,
        onfocus: focus.onFocus,
        onblur: focus.onBlur,
        class: styles.base()
      },
      { ...rest, class: className }
    )
  );
</script>

<button bind:this={ref} {...buttonProps}>
  {#if children}
    {@render children()}
  {/if}
</button>

{#if state.groupCtx.name}
  <input
    type="radio"
    class={styles.input()}
    tabindex={-1}
    aria-hidden="true"
    name={state.groupCtx.name}
    value={state.value}
    checked={state.isChecked}
    disabled={state.finalDisabled}
    required={state.groupCtx.required}
    oninvalid={(e) => {
      e.preventDefault();
      state.groupCtx.setSubmissionInvalid(true);
      focusFirstRadio({
        container: ref?.closest<HTMLElement>('[role="radiogroup"]') ?? null,
        setActiveId: state.groupCtx.setActiveId
      });
    }}
  />
{/if}
