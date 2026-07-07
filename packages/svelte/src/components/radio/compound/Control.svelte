<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import { useRadioContext } from "../../../contexts/internal/index.js";
  import Indicator from "./Indicator.svelte";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useRadioContext();
  const styles = $derived(radioStyles({}));
</script>

<div
  class={cn(styles.control(), className)}
  data-state={ctx.checked ? "checked" : "unchecked"}
  data-disabled={ctx.disabled ? "" : undefined}
  data-invalid={ctx.invalid ? "" : undefined}
>
  {#if children}
    {@render children()}
  {:else}
    <Indicator />
  {/if}
</div>
