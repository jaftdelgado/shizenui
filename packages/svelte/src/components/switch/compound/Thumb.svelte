<script lang="ts">
  import { type Snippet } from "svelte";
  import { switchStyles } from "@shizen-ui/styles";

  import { cn } from "../../../lib/utils";

  import { useSwitchContext } from "../_internal/index.js";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useSwitchContext();
  const styles = $derived(switchStyles());
</script>

<div
  class={cn(styles.thumb(), className)}
  data-checked={ctx.checked ? "" : undefined}
  data-disabled={ctx.disabled ? "" : undefined}
  data-invalid={ctx.invalid ? "" : undefined}
>
  {#if children}
    <div class="switch__thumb-content">
      {@render children()}
    </div>
  {/if}
</div>
