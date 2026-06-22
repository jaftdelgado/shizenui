<script lang="ts">
  import { buttonGroupStyles } from "@shizen-ui/styles";
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
