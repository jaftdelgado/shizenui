<script lang="ts">
  import { toggleGroupStyles } from "@shizen-ui/styles";
  import { warnIf } from "../../lib/runes/index.js";
  import { cn, presence } from "../../lib/utils";
  import type { ToggleGroupProps } from "./_internal/index.js";
  import { ToggleGroupState, setToggleGroupContext } from "./_internal/index.js";

  let {
    children,
    class: className,
    variant = "default",
    size = "md",
    orientation = "horizontal",
    hideSeparator = false,
    disabled = undefined,
    selectionMode = undefined,
    value = $bindable(undefined),
    onValueChange = undefined,
    ...rest
  }: ToggleGroupProps = $props();

  warnIf(
    () => !children,
    "ToggleGroup",
    "No children provided. Add at least one <Toggle> as a child."
  );

  warnIf(
    () => !selectionMode && value !== undefined,
    "ToggleGroup",
    "A 'value' prop was provided without 'selectionMode'. Did you mean to add selectionMode='single' or selectionMode='multiple'?"
  );

  const toggleGroupState = new ToggleGroupState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled,
    orientation: () => orientation,
    hideSeparator: () => hideSeparator,
    selectionMode: () => selectionMode,
    value: () => value,
    setValue: (nextValue) => {
      value = nextValue;
    },
    onValueChange: () => onValueChange
  });

  setToggleGroupContext({
    get variant() {
      return toggleGroupState.finalVariant;
    },
    get size() {
      return toggleGroupState.finalSize;
    },
    get disabled() {
      return toggleGroupState.finalDisabled;
    },
    get selectionMode() {
      return toggleGroupState.finalSelectionMode;
    },
    get selectedValues() {
      return toggleGroupState.finalSelectedValues;
    },
    get onToggle() {
      return (value: string) => toggleGroupState.toggle(value);
    }
  });

  const styles = $derived(
    toggleGroupStyles({
      variant: toggleGroupState.finalVariant,
      size: toggleGroupState.finalSize,
      hideSeparator: toggleGroupState.finalHideSeparator
    })
  );
</script>

<div
  role="group"
  class={cn(styles, className)}
  data-disabled={presence(toggleGroupState.finalDisabled)}
  data-orientation={toggleGroupState.finalOrientation}
  {...rest}
>
  {@render children?.()}
</div>
