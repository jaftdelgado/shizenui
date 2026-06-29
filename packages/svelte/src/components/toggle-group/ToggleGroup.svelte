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
    ...rest
  }: ToggleGroupProps = $props();

  warnIf(
    () => !children,
    "ToggleGroup",
    "No children provided. Add at least one <Toggle> as a child."
  );

  const toggleGroupState = new ToggleGroupState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled,
    orientation: () => orientation,
    hideSeparator: () => hideSeparator
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
