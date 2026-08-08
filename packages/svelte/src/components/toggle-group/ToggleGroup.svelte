<script lang="ts">
  import { toggleGroupStyles } from "@shizen-ui/styles";
  import { warnIf } from "../../lib/runes/index.js";
  import { mergeProps, presence } from "../../lib/utils/index.js";
  import type { ToggleGroupProps } from "./_internal/index.js";
  import {
    ToggleGroupState,
    createToggleGroupHandlers,
    setupToggleGroupContext,
    useToggleGroupContext
  } from "./_internal/index.js";

  let {
    children,
    class: className,
    variant = "default",
    size = "md",
    orientation = "horizontal",
    hideSeparators = false,
    disabled = undefined,
    selectionMode = "single",
    value = $bindable(undefined),
    onValueChange = undefined,
    ref = $bindable(null),
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
    hideSeparators: () => hideSeparators,
    selectionMode: () => selectionMode,
    value: () => value,
    setValue: (nextValue) => {
      value = nextValue;
    },
    onValueChange: () => onValueChange
  });

  setupToggleGroupContext(toggleGroupState);

  const groupCtx = useToggleGroupContext();

  const handlers = createToggleGroupHandlers({
    getContainer: () => ref,
    groupCtx,
    getOrientation: () => toggleGroupState.finalOrientation
  });

  const styles = $derived(
    toggleGroupStyles({
      variant: toggleGroupState.finalVariant,
      size: toggleGroupState.finalSize,
      hideSeparators: toggleGroupState.finalHideSeparators
    })
  );

  const groupProps = $derived(
    mergeProps(
      {
        class: styles,
        "data-disabled": presence(toggleGroupState.finalDisabled),
        "data-orientation": toggleGroupState.finalOrientation,
        onkeydown: handlers.handleKeydown
      },
      { ...rest, class: className }
    )
  );
</script>

<div bind:this={ref} {...groupProps}>
  {@render children?.()}
</div>
