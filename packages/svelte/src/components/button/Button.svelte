<script lang="ts">
  import { buttonStyles } from "@shizen-ui/styles";
  import { cn } from "../../lib/utils";

  import { warnIf } from "../../lib/runes/index.js";
  import type { ButtonProps, IconContent } from "./_internal/index.js";
  import { ButtonState } from "./_internal/index.js";

  let {
    children,
    startContent,
    endContent,
    onclick,
    ref = $bindable(null),
    class: className,
    type = "button",
    variant,
    size,
    disabled,
    loading = false,
    iconOnly = false,
    ...rest
  }: ButtonProps = $props();

  warnIf(
    () => iconOnly && !rest["aria-label"],
    "Button",
    "No 'aria-label' provided with 'iconOnly=true'. The button will have no accessible name."
  );

  warnIf(
    () => loading === true && disabled === true,
    "Button",
    "'loading' and 'disabled' are both set. Use only 'loading' to represent a pending state."
  );

  const state = new ButtonState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled,
    loading: () => loading
  });

  const styles = $derived(
    buttonStyles({
      variant: state.finalVariant,
      size: state.finalSize,
      iconOnly
    })
  );
</script>

{#snippet renderIcon(content: IconContent | undefined, position: "start" | "end")}
  {#if typeof content === "string"}
    <i class={content}></i>
  {:else if content}
    <span class={position === "start" ? styles.iconStart() : styles.iconEnd()}>
      {@render content()}
    </span>
  {/if}
{/snippet}

<button
  bind:this={ref}
  {type}
  {onclick}
  disabled={state.finalDisabled}
  aria-busy={loading || undefined}
  class={cn(styles.base(), className)}
  {...rest}
>
  <span class={styles.content()}>
    {#if iconOnly}
      <span class={styles.icon()}>
        {@render children?.()}
      </span>
    {:else}
      {@render renderIcon(startContent, "start")}
      {#if children}
        <span class={styles.label()}>
          {@render children()}
        </span>
      {/if}
      {@render renderIcon(endContent, "end")}
    {/if}
  </span>
</button>
