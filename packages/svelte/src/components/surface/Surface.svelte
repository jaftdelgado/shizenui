<script lang="ts">
  import { surfaceStyles } from "@shizen-ui/styles";
  import { cn } from "../../lib/utils/index.js";
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
</script>

<div bind:this={ref} class={cn(surfaceStyles({ variant }), className)} {...rest}>
  {@render children?.()}
</div>
