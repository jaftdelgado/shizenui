<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles } from "@shizen-ui/styles";
  import Indicator from "./Indicator.svelte";
  import { useCheckboxContext } from "../_internal/index.js";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useCheckboxContext();
  const styles = $derived(checkboxStyles({}));
</script>

<div
  class={cn(styles.control(), className)}
  data-state={ctx.checkboxState}
  data-disabled={ctx.disabled ? "" : undefined}
  data-invalid={ctx.invalid ? "" : undefined}
>
  {#if children}
    {@render children()}
  {:else}
    <Indicator />
  {/if}
</div>
