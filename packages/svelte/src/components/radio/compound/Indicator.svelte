<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import { useRadioContext } from "../../../contexts/internal/index.js";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles({}));

  const isCustom = $derived(!!children);
</script>

{#if ctx.checked}
  <span
    class={cn(!isCustom && styles.indicator(), className)}
    data-state={ctx.checked ? "checked" : "unchecked"}
    data-custom={isCustom ? "" : undefined}
  >
    {#if children}
      {@render children()}
    {/if}
  </span>
{/if}
