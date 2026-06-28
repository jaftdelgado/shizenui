<script lang="ts">
  import { toggleStyles } from "@shizen-ui/styles";
  import { cn } from "../../lib/utils";
  import { warnIf } from "../../lib/runes/index.js";
  import type { ToggleProps, IconContent } from "./_internal/index.js";
  import { ToggleState, createToggleHandlers } from "./_internal/index.js";

  let {
    children,
    startContent,
    endContent,
    class: className,
    type = "button",
    variant,
    size,
    disabled,
    iconOnly = false,
    pressed = $bindable(false),
    onPressedChange,
    ref = $bindable(null),
    ...rest
  }: ToggleProps = $props();

  warnIf(
    () => iconOnly && !rest["aria-label"],
    "Toggle",
    "No 'aria-label' provided with 'iconOnly=true'. The toggle will have no accessible name."
  );

  const state = new ToggleState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled
  });

  const handlers = createToggleHandlers({
    state,
    getPressed: () => pressed,
    setPressed: (val) => {
      pressed = val;
    },
    onPressedChange: (val) => onPressedChange?.(val),
    getOnClick: () => rest.onclick
  });

  const styles = $derived(
    toggleStyles({
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
  disabled={state.finalDisabled}
  aria-pressed={pressed}
  onclick={handlers.handleClick}
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
