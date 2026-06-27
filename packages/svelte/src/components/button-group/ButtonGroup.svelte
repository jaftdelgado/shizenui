<script lang="ts">
  import { buttonGroupStyles } from "@shizen-ui/styles";
  import { warnIf } from "../../lib/runes/index.js";
  import { cn, presence } from "../../lib/utils";
  import type { ButtonGroupProps } from "./_internal/index.js";
  import { ButtonGroupState, setButtonGroupContext } from "./_internal/index.js";

  let {
    children,
    class: className,
    variant = "primary",
    size = "md",
    orientation = "horizontal",
    hideSeparator = false,
    disabled = undefined,
    ...rest
  }: ButtonGroupProps = $props();

  warnIf(
    () => !children,
    "ButtonGroup",
    "No children provided. Add at least one <Button> as a child."
  );

  const buttonGroupState = new ButtonGroupState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled,
    orientation: () => orientation,
    hideSeparator: () => hideSeparator
  });

  setButtonGroupContext({
    get variant() {
      return buttonGroupState.finalVariant;
    },
    get size() {
      return buttonGroupState.finalSize;
    },
    get disabled() {
      return buttonGroupState.finalDisabled;
    }
  });

  const styles = $derived(
    buttonGroupStyles({
      variant: buttonGroupState.finalVariant,
      size: buttonGroupState.finalSize,
      hideSeparator: buttonGroupState.finalHideSeparator
    })
  );
</script>

<div
  role="group"
  class={cn(styles, className)}
  data-disabled={presence(buttonGroupState.finalDisabled)}
  data-orientation={buttonGroupState.finalOrientation}
  {...rest}
>
  {@render children?.()}
</div>
