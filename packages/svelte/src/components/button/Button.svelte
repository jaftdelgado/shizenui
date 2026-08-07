<script lang="ts">
  import { buttonStyles } from "@shizen-ui/styles";
  import { mergeProps } from "../../lib/utils/index.js";

  import type { ButtonProps, IconContent } from "./_internal/index.js";
  import { ButtonState, createButtonHandlers, setupButtonWarnings } from "./_internal/index.js";

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

  const buttonState = new ButtonState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled,
    loading: () => loading
  });

  setupButtonWarnings({
    isIconOnly: () => iconOnly,
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"])
  });

  const handlers = createButtonHandlers({
    getDisabled: () => buttonState.finalDisabled
  });

  const styles = $derived(
    buttonStyles({
      variant: buttonState.finalVariant,
      size: buttonState.finalSize,
      iconOnly
    })
  );

  const buttonProps = $derived(
    mergeProps(
      {
        type,
        onclick,
        disabled: buttonState.finalDisabled,
        "aria-busy": loading || undefined,
        "data-slot": "button",
        onkeydown: handlers.handleKeydown,
        onkeyup: handlers.handleKeyup,
        onmousedown: handlers.handleMouseDown,
        onmouseup: handlers.handleMouseUp,
        onmouseleave: handlers.handleMouseLeave,
        onblur: handlers.handleBlur,
        class: styles.base()
      },
      { ...rest, class: className }
    )
  );
</script>

{#snippet renderIcon(content: IconContent | undefined, position: "start" | "end")}
  {#if content}
    <span class={position === "start" ? styles.iconStart() : styles.iconEnd()}>
      {@render content()}
    </span>
  {/if}
{/snippet}

<button bind:this={ref} {...buttonProps}>
  <span class={styles.content()}>
    {#if iconOnly}
      <span class={styles.icon()}>
        {@render children?.()}
      </span>
    {:else}
      {@render renderIcon(startContent, "start")}
      {#if children}
        {@render children()}
      {/if}
      {@render renderIcon(endContent, "end")}
    {/if}
  </span>
</button>
