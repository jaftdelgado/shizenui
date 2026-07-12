<script lang="ts">
  import { radioGroupStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { RadioGroupProps } from "./_internal/index.js";
  import {
    RadioGroupState,
    setupRadioGroupContexts,
    useRadioGroupContext
  } from "./_internal/index.js";
  import { warnIf } from "../../lib/runes/index.js";

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
    required = false,
    orientation = "vertical",
    id = createId("radio-group", uid),
    ref = $bindable(null),
    ...rest
  }: RadioGroupProps = $props();

  warnIf(
    () => !children,
    "RadioGroup",
    "No children provided. Add at least one <Radio> as a child."
  );

  const state = new RadioGroupState({
    value: () => value,
    onValueChange: () => onValueChange,
    name: () => name,
    disabled: () => disabled,
    readonly: () => readonly,
    invalid: () => invalid,
    required: () => required,
    orientation: () => orientation,
    id: () => id,
    setValue: (v) => {
      value = v;
    }
  });

  setupRadioGroupContexts(state);

  const ctx = useRadioGroupContext();

  warnIf(
    () => !ctx.hasLabel && !rest["aria-label"],
    "RadioGroup",
    "No Label found. Add a <Label> as a child, or pass aria-label directly."
  );

  warnIf(
    () => !ctx.hasItems,
    "RadioGroup",
    "No <RadioGroup.Items> found. Wrap your <Radio> children in <RadioGroup.Items> to enable roving focus and keyboard navigation."
  );

  const styles = $derived(radioGroupStyles({ orientation: state.finalOrientation }));

  const describedBy = $derived(
    [
      ctx.hasError ? ctx.errorId : null,
      !ctx.hasError && ctx.hasDescription ? ctx.descriptionId : null
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );
</script>

<div
  bind:this={ref}
  {id}
  role="radiogroup"
  class={cn(styles.base(), className)}
  aria-labelledby={ctx.hasLabel ? ctx.labelId : undefined}
  aria-describedby={describedBy}
  aria-invalid={state.finalInvalid ? true : undefined}
  aria-disabled={state.finalDisabled ? true : undefined}
  aria-readonly={state.finalReadonly ? true : undefined}
  aria-required={state.finalRequired ? true : undefined}
  data-invalid={presence(state.finalInvalid)}
  data-disabled={presence(state.finalDisabled)}
  data-readonly={presence(state.finalReadonly)}
  data-orientation={state.finalOrientation}
  {...rest}
>
  {#if state.finalName}
    <input
      type="hidden"
      name={state.finalName}
      value={state.finalValue}
      disabled={state.finalDisabled || !state.finalValueIsValid}
    />
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
