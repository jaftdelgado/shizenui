<script lang="ts">
  import { checkboxGroupStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { CheckboxGroupProps } from "./_internal/index.js";
  import {
    CheckboxGroupState,
    setupCheckboxGroupContexts,
    useCheckboxGroupContext
  } from "./_internal/index.js";
  import { syncFormReset, warnIf } from "../../lib/runes/index.js";

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
    orientation = "vertical",
    id = createId("checkbox-group", uid),
    ref = $bindable(null),
    ...rest
  }: CheckboxGroupProps = $props();

  let isInternalWrite = false;
  let baselineValue = $state<string[]>([...(value ?? [])]);
  let submissionInvalid = $state(false);
  let hiddenInputRef: HTMLInputElement | null = $state(null);

  $effect(() => {
    const v = value;

    if (isInternalWrite) {
      isInternalWrite = false;
      return;
    }

    baselineValue = [...(v ?? [])];
  });

  warnIf(
    () => !children,
    "CheckboxGroup",
    "No children provided. Add at least one <Checkbox> as a child."
  );

  const checkboxGroupState = new CheckboxGroupState({
    value: () => value,
    onValueChange: () => onValueChange,
    name: () => name,
    disabled: () => disabled,
    readonly: () => readonly,
    invalid: () => invalid,
    submissionInvalid: () => submissionInvalid,
    required: () => required,
    orientation: () => orientation,
    id: () => id,
    setValue: (v) => {
      isInternalWrite = true;
      value = v;
    }
  });

  setupCheckboxGroupContexts(checkboxGroupState);

  const ctx = useCheckboxGroupContext();

  warnIf(
    () => !ctx.hasLabel && !rest["aria-label"] && !rest["aria-labelledby"],
    "CheckboxGroup",
    "No Label found. Add a <Label> as a child, or pass aria-label/aria-labelledby directly."
  );

  const styles = $derived(
    checkboxGroupStyles({ orientation: checkboxGroupState.finalOrientation })
  );

  const describedBy = $derived(
    [
      ctx.hasError ? ctx.errorId : null,
      !ctx.hasError && ctx.hasDescription ? ctx.descriptionId : null
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );

  $effect(() => {
    if (checkboxGroupState.finalValue.length > 0) submissionInvalid = false;
  });

  syncFormReset({
    getRef: () => ref,
    onReset: () => {
      isInternalWrite = true;
      value = [...baselineValue];
      onValueChange?.(value);
    }
  });
</script>

<div
  bind:this={ref}
  {id}
  role="group"
  class={cn(styles.base(), className)}
  aria-labelledby={ctx.hasLabel ? ctx.labelId : undefined}
  aria-describedby={describedBy}
  aria-disabled={checkboxGroupState.finalDisabled ? true : undefined}
  data-checkbox-group=""
  data-invalid={presence(checkboxGroupState.finalInvalid)}
  data-disabled={presence(checkboxGroupState.finalDisabled)}
  data-readonly={presence(checkboxGroupState.finalReadonly)}
  data-orientation={checkboxGroupState.finalOrientation}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}

  {#if checkboxGroupState.finalRequired}
    <input
      bind:this={hiddenInputRef}
      type="checkbox"
      class={styles.input()}
      tabindex={-1}
      aria-hidden="true"
      checked={checkboxGroupState.finalValue.length > 0}
      disabled={checkboxGroupState.finalDisabled}
      required
      oninvalid={(e) => {
        e.preventDefault();
        submissionInvalid = true;
        ref?.querySelector<HTMLButtonElement>('[role="checkbox"]')?.focus();
      }}
    />
  {/if}
</div>
