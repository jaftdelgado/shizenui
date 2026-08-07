<script lang="ts">
  import { chipStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../lib/utils/index.js";
  import type { ChipIconContent, ChipProps } from "./_internal/index.js";

  let {
    children,
    startContent,
    endContent,
    color = "default",
    size = "md",
    variant = "primary",
    ref = $bindable(null),
    class: className,
    ...rest
  }: ChipProps = $props();

  const styles = $derived(chipStyles({ color, size, variant }));

  const chipProps = $derived(
    mergeProps({ class: styles.base() }, { ...rest, class: className })
  );
</script>

{#snippet renderIcon(content: ChipIconContent | undefined, position: "start" | "end")}
  {#if content}
    <span class={position === "start" ? styles.iconStart() : styles.iconEnd()}>
      {@render content()}
    </span>
  {/if}
{/snippet}

<span bind:this={ref} {...chipProps}>
  <span class={styles.content()}>
    {@render renderIcon(startContent, "start")}
    {#if children}
      {@render children()}
    {/if}
    {@render renderIcon(endContent, "end")}
  </span>
</span>
