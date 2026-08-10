<script lang="ts">
  import { switchGroupStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import { syncFormReset, syncNativeCheckedReset } from "../../lib/runes/index.js";
  import type { SubmissionInvalidState } from "../../lib/runes/index.js";
  import type { SwitchGroupProps } from "./_internal/index.js";
  import {
    SwitchGroupState,
    resolveSwitchGroupDescribedBy,
    setupSwitchGroupContexts,
    setupSwitchGroupForm,
    setupSwitchGroupWarnings,
    useSwitchGroupContext,
    focusFirstSwitch
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    value = $bindable(),
    onValueChange,
    name = undefined,
    disabled = undefined,
    readonly = undefined,
    invalid = undefined,
    required = undefined,
    size = "md",
    orientation = "vertical",
    id = createId("switch-group", uid),
    ref = $bindable(null),
    ...rest
  }: SwitchGroupProps = $props();

  let isInternalWrite = false;
  let baselineValue = $state<string[]>([...(value ?? [])]);
  let nativeInputRef = $state<HTMLInputElement | null>(null);
  let submissionInvalid: SubmissionInvalidState;

  $effect(() => {
    const currentValue = value;

    if (isInternalWrite) {
      isInternalWrite = false;
      return;
    }

    baselineValue = [...(currentValue ?? [])];
  });

  const switchGroupState = new SwitchGroupState({
    value: () => value,
    onValueChange: () => onValueChange,
    name: () => name,
    disabled: () => disabled,
    readonly: () => readonly,
    invalid: () => invalid,
    required: () => required,
    size: () => size,
    orientation: () => orientation,
    submissionInvalid: () => submissionInvalid.value,
    setValue: (nextValue) => {
      isInternalWrite = true;
      value = nextValue;
    },
    id: () => id
  });

  submissionInvalid = setupSwitchGroupForm({
    state: switchGroupState,
    getRef: () => ref
  });

  setupSwitchGroupContexts(switchGroupState, { id: () => id });

  const ctx = useSwitchGroupContext();

  setupSwitchGroupWarnings({
    context: ctx,
    hasChildren: () => Boolean(children),
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  const styles = $derived(switchGroupStyles({ orientation: switchGroupState.finalOrientation }));

  const describedBy = $derived(resolveSwitchGroupDescribedBy(ctx, rest["aria-describedby"]));

  const groupProps = $derived(
    mergeProps(
      {
        id,
        role: "group",
        class: styles.base(),
        ...(ctx.hasLabel ? { "aria-labelledby": ctx.labelId } : {}),
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        "aria-disabled": switchGroupState.finalDisabled ? true : undefined,
        "aria-required": switchGroupState.finalRequired ? true : undefined,
        "aria-invalid": switchGroupState.finalInvalid ? true : undefined,
        "aria-readonly": switchGroupState.finalReadonly ? true : undefined,
        "data-slot": "switch-group",
        "data-invalid": presence(switchGroupState.finalInvalid),
        "data-disabled": presence(switchGroupState.finalDisabled),
        "data-readonly": presence(switchGroupState.finalReadonly),
        "data-orientation": switchGroupState.finalOrientation
      },
      { ...rest, class: className }
    )
  );

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      submissionInvalid.clear();
      const resetValue = [...baselineValue];

      syncNativeCheckedReset(nativeInputRef, resetValue.length > 0);

      isInternalWrite = true;
      value = resetValue;
      onValueChange?.(value);
    },
    onResetComplete: () => {
      syncNativeCheckedReset(nativeInputRef, baselineValue.length > 0);
    }
  });
</script>

<!--
  role="group" has no checkbox/switch-specific ARIA equivalent. The group-level state remains
  intentional because it communicates relational form state to assistive technology.
-->
<!-- svelte-ignore a11y_role_supports_aria_props -->
<div bind:this={ref} {...groupProps}>
  {#if children}
    {@render children()}
  {/if}

  {#if switchGroupState.finalRequired}
    <input
      bind:this={nativeInputRef}
      type="checkbox"
      class={styles.input()}
      tabindex={-1}
      aria-hidden="true"
      checked={switchGroupState.hasSelection}
      disabled={switchGroupState.finalDisabled}
      required
      oninvalid={(event) => {
        event.preventDefault();
        submissionInvalid.set(true);
        focusFirstSwitch(ref);
      }}
    />
  {/if}
</div>
