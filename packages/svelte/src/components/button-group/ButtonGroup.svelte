<script lang="ts">
  import { buttonGroupStyles } from "@shizen-ui/styles";
  import { warnIf } from "../../lib/runes/index.js";
  import { cn, presence } from "../../lib/utils";
  import type { ButtonGroupProps } from "./_internal/index.js";
  import { setButtonGroupContext } from "./_internal/index.js";

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

  setButtonGroupContext({
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get disabled() {
      return disabled;
    }
  });

  const styles = $derived(buttonGroupStyles({ variant, size, hideSeparator }));
</script>

<div
  role="group"
  class={cn(styles, className)}
  data-disabled={presence(disabled ?? false)}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
