<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles } from "@shizen-ui/styles";
  import { useCheckboxContext } from "../_internal/index.js";
  import { CheckIcon } from "../../../shared/icons/index.js";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useCheckboxContext();
  const styles = $derived(checkboxStyles({}));
  const isCustom = $derived(Boolean(children));
</script>

{#if ctx.checkboxState === "checked" || ctx.checkboxState === "indeterminate"}
  <span
    class={cn(!isCustom && styles.indicator(), className)}
    data-state={ctx.checkboxState}
    data-disabled={ctx.disabled ? "" : undefined}
    data-invalid={ctx.invalid ? "" : undefined}
    data-custom={isCustom ? "" : undefined}
  >
    {#if children}
      {@render children()}
    {:else if ctx.checkboxState === "indeterminate"}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5H8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {:else}
      <CheckIcon />
    {/if}
  </span>
{/if}
