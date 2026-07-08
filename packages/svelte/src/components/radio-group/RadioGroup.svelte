<script lang="ts">
  import { radioGroupStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { RadioGroupProps } from "./_internal/index.js";
  import { RadioGroupState, setupRadioGroupContexts } from "./_internal/index.js";
  import { warnIf } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    value = $bindable(),
    name = undefined,
    disabled = undefined,
    readonly = undefined,
    invalid = undefined,
    required = false,
    orientation = "vertical",
    id = createId("radio-group", uid),
    ...rest
  }: RadioGroupProps = $props();

  warnIf(
    () => !children,
    "RadioGroup",
    "No children provided. Add at least one <Radio> as a child."
  );

  warnIf(
    () => !name,
    "RadioGroup",
    "No 'name' prop provided. Radios inside this group won't be grouped correctly for form submission."
  );

  const state = new RadioGroupState({
    value: () => value,
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

  const styles = $derived(radioGroupStyles({ orientation: state.finalOrientation }));
</script>

<div
  {id}
  role="radiogroup"
  class={cn(styles.base(), className)}
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
  {@render children()}
</div>
