<script lang="ts">
  import { surfaceStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../lib/utils/index.js";
  import { setupSurfaceContext } from "./_internal/index.js";
  import type { SurfaceProps } from "./_internal/index.js";

  let {
    children,
    class: className,
    variant = "default",
    ref = $bindable(null),
    ...rest
  }: SurfaceProps = $props();

  setupSurfaceContext();

  const styles = $derived(surfaceStyles({ variant }));

  const surfaceProps = $derived(mergeProps({ class: styles }, { ...rest, class: className }));
</script>

<div bind:this={ref} {...surfaceProps}>
  {@render children?.()}
</div>
