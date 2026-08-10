<script lang="ts">
  import { switchStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import {
    createFocusVisible,
    syncFormReset,
    syncNativeCheckedReset
  } from "../../lib/runes/index.js";
  import type { SubmissionInvalidState } from "../../lib/runes/index.js";
  import type { SwitchProps } from "./_internal/index.js";
  import {
    SwitchState,
    createSwitchHandlers,
    resolveSwitchDescribedBy,
    setupSwitchContexts,
    setupSwitchForm,
    setupSwitchWarnings,
    useSwitchContext
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    checked = $bindable(false),
    disabled = undefined,
    readonly = undefined,
    invalid = undefined,
    required = undefined,
    name,
    value,
    id = createId("switch", uid),
    ref = $bindable(null),
    size = "md",
    onCheckedChange,
    onclick,
    children,
    ...rest
  }: SwitchProps = $props();

  let isInternalWrite = false;
  let baselineChecked = $state(checked);
  let nativeInputRef = $state<HTMLInputElement | null>(null);
  let submissionInvalid: SubmissionInvalidState;

  $effect(() => {
    const currentChecked = checked;

    if (isInternalWrite) {
      isInternalWrite = false;
      return;
    }

    baselineChecked = currentChecked;
  });

  const switchState = new SwitchState({
    checked: () => checked,
    disabled: () => disabled,
    readonly: () => readonly,
    invalid: () => invalid,
    required: () => required,
    size: () => size,
    submissionInvalid: () => submissionInvalid.value,
    name: () => name,
    value: () => value,
    id: () => id
  });

  submissionInvalid = setupSwitchForm({
    state: switchState,
    getRef: () => ref
  });

  setupSwitchContexts(switchState, { checked: () => checked, id: () => id });

  const ctx = useSwitchContext();

  setupSwitchWarnings({
    state: switchState,
    context: ctx,
    hasChildren: () => Boolean(children),
    getValue: () => value,
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  function setChecked(next: boolean): void {
    isInternalWrite = true;
    checked = next;
    onCheckedChange?.(next);
  }

  const focus = createFocusVisible();

  const handlers = createSwitchHandlers({
    state: switchState,
    setChecked,
    focus,
    getValue: () => value,
    getOnClick: () => onclick
  });

  const styles = $derived(switchStyles({ size: switchState.finalSize }));

  const describedBy = $derived(
    resolveSwitchDescribedBy(switchState, ctx, id, rest["aria-describedby"])
  );

  const buttonProps = $derived(
    mergeProps(
      {
        type: "button" as const,
        role: "switch",
        id,
        disabled: switchState.finalDisabled,
        "aria-checked": switchState.finalChecked,
        "aria-disabled": switchState.finalDisabled ? true : undefined,
        "aria-invalid": switchState.finalInvalid ? true : undefined,
        "aria-readonly": switchState.finalReadonly ? true : undefined,
        "aria-required": switchState.finalRequired ? true : undefined,
        ...(ctx.hasLabel ? { "aria-labelledby": `${id}-label` } : {}),
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        tabindex: !switchState.finalDisabled ? 0 : -1,
        "data-slot": "switch",
        "data-checked": presence(switchState.finalChecked),
        "data-disabled": presence(switchState.finalDisabled),
        "data-readonly": presence(switchState.finalReadonly),
        "data-invalid": presence(switchState.finalInvalid),
        "data-focus-visible": presence(focus.isFocusVisible),
        onclick: handlers.handleClick,
        onkeydown: handlers.handleKeydown,
        onkeyup: handlers.handleKeyup,
        onmousedown: handlers.handleMouseDown,
        onmouseup: handlers.handleMouseUp,
        onmouseleave: handlers.handleMouseLeave,
        onfocus: focus.onFocus,
        onblur: handlers.handleBlur,
        class: styles.base()
      },
      { ...rest, class: className }
    )
  );

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      submissionInvalid.clear();

      syncNativeCheckedReset(nativeInputRef, switchState.finalChecked);

      if (switchState.groupCtx.exists) return;
      checked = baselineChecked;
    },
    onResetComplete: () => {
      syncNativeCheckedReset(nativeInputRef, switchState.finalChecked);
    }
  });
</script>

<button bind:this={ref} {...buttonProps}>
  {#if children}
    {@render children({
      isChecked: switchState.finalChecked,
      isDisabled: switchState.finalDisabled,
      isReadonly: switchState.finalReadonly,
      isFocusVisible: focus.isFocusVisible
    })}
  {/if}
</button>

{#if switchState.finalName || switchState.finalRequired}
  <input
    bind:this={nativeInputRef}
    type="checkbox"
    class={styles.input()}
    tabindex={-1}
    aria-hidden="true"
    name={switchState.finalName}
    value={switchState.value ?? "on"}
    checked={switchState.finalChecked}
    disabled={switchState.finalDisabled}
    required={switchState.finalRequired}
    oninvalid={(event) => {
      event.preventDefault();
      submissionInvalid.set(true);
      ref?.focus();
    }}
  />
{/if}
