<script lang="ts">
  import { checkboxGroupStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { CheckboxGroupProps } from "./_internal/index.js";
  import {
    CheckboxGroupState,
    setupCheckboxGroupContexts,
    useCheckboxGroupContext
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
    required = undefined,
    orientation = "vertical",
    id = createId("checkbox-group", uid),
    ref = $bindable(null),
    ...rest
  }: CheckboxGroupProps = $props();

  warnIf(
    () => !children,
    "CheckboxGroup",
    "No children provided. Add at least one <Checkbox> as a child."
  );

  const state = new CheckboxGroupState({
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

  setupCheckboxGroupContexts(state);

  const ctx = useCheckboxGroupContext();

  warnIf(
    () => !ctx.hasLabel && !rest["aria-label"],
    "CheckboxGroup",
    "No Label found. Add a <Label> as a child, or pass aria-label directly."
  );

  const styles = $derived(checkboxGroupStyles({ orientation: state.finalOrientation }));

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
  role="group"
  class={cn(styles.base(), className)}
  aria-labelledby={ctx.hasLabel ? ctx.labelId : undefined}
  aria-describedby={describedBy}
  aria-invalid={state.finalInvalid ? true : undefined}
  aria-disabled={state.finalDisabled ? true : undefined}
  aria-readonly={state.finalReadonly ? true : undefined}
  aria-required={state.finalRequired ? true : undefined}
  data-checkbox-group=""
  data-invalid={presence(state.finalInvalid)}
  data-disabled={presence(state.finalDisabled)}
  data-readonly={presence(state.finalReadonly)}
  data-orientation={state.finalOrientation}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</div>
