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
  import {
    createFocusVisible,
    syncFormReset,
    syncNativeCheckedReset
  } from "../../lib/runes/index.js";

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

  let nativeInputRef = $state<HTMLInputElement | null>(null);

  const radioState = new RadioState({
    value: () => value,
    disabled: () => disabled,
    variant: () => variant,
    id: () => id
  });

  setupRadioContexts(radioState);
  setupRadioGroupRegistration(radioState);

  const ctx = useRadioContext();

  setupRadioWarnings({
    state: radioState,
    context: ctx,
    hasChildren: () => Boolean(children),
    getVariant: () => variant,
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  const focus = createFocusVisible();

  const handlers = createRadioHandlers({
    state: radioState,
    focus,
    getOnClick: () => onclick
  });

  const styles = $derived(radioStyles({ variant: radioState.finalVariant }));

  const describedBy = $derived(resolveRadioDescribedBy(radioState, ctx, id));

  const buttonProps = $derived(
    mergeProps(
      {
        type: "button" as const,
        role: "radio",
        id,
        disabled: radioState.finalDisabled,
        "aria-checked": radioState.isChecked,
        "aria-disabled": radioState.finalDisabled ? true : undefined,
        "aria-labelledby": ctx.hasLabel ? `${id}-label` : undefined,
        "aria-describedby": describedBy,
        tabindex: radioState.groupCtx.isActive(id) ? 0 : -1,
        "data-checked": presence(radioState.isChecked),
        "data-disabled": presence(radioState.finalDisabled),
        "data-readonly": presence(radioState.finalReadonly),
        "data-invalid": presence(radioState.finalInvalid),
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

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      syncNativeCheckedReset(nativeInputRef, radioState.isChecked);
    },
    onResetComplete: () => {
      syncNativeCheckedReset(nativeInputRef, radioState.isChecked);
    }
  });
</script>

<button bind:this={ref} {...buttonProps}>
  {#if children}
    {@render children()}
  {/if}
</button>

{#if radioState.groupCtx.name}
  <input
    bind:this={nativeInputRef}
    type="radio"
    class={styles.input()}
    tabindex={-1}
    aria-hidden="true"
    name={radioState.groupCtx.name}
    value={radioState.value}
    checked={radioState.isChecked}
    disabled={radioState.finalDisabled}
    required={radioState.groupCtx.required}
    oninvalid={(e) => {
      e.preventDefault();
      radioState.groupCtx.setSubmissionInvalid(true);
      focusFirstRadio({
        container: ref?.closest<HTMLElement>('[role="radiogroup"]') ?? null,
        setActiveId: radioState.groupCtx.setActiveId
      });
    }}
  />
{/if}
