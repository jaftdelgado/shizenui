<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { radioGroupStyles } from "@shizen-ui/styles";
  import type { RadioGroupProps } from "./_internal/index.js";
  import { RadioGroupState } from "./_internal/index.js";

  let {
    children,
    class: className,
    value = $bindable(),
    name = crypto.randomUUID(),
    invalid = false,
    disabled = false,
    required = false,
    orientation = "vertical",
    id = crypto.randomUUID(),
    ...rest
  }: RadioGroupProps = $props();

  new RadioGroupState({
    value: () => value,
    name: () => name,
    disabled: () => disabled,
    invalid: () => invalid,
    required: () => required,
    orientation: () => orientation,
    id: () => id,
    setValue: (v) => {
      value = v;
    }
  });

  const styles = $derived(radioGroupStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.base(), className)}
  role="radiogroup"
  data-invalid={invalid}
  data-disabled={disabled}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
