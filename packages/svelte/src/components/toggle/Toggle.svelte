<script lang="ts">
  import { toggleStyles } from "@shizen-ui/styles";
  import { createId, mergeProps } from "../../lib/utils/index.js";
  import type { ToggleProps, ToggleIconContent } from "./_internal/index.js";
  import {
    ToggleState,
    createToggleHandlers,
    registerToggleInGroup,
    setupToggleWarnings
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    startContent,
    endContent,
    class: className,
    variant,
    size,
    id = createId("toggle", uid),
    disabled,
    value = undefined,
    iconOnly = false,
    pressed = $bindable(false),
    onPressedChange,
    onclick,
    ref = $bindable(null),
    ...rest
  }: ToggleProps = $props();

  const toggleState = new ToggleState({
    variant: () => variant,
    size: () => size,
    disabled: () => disabled,
    value: () => value,
    getPressed: () => pressed,
    setPressed: (val) => {
      pressed = val;
    },
    onPressedChange: (val) => onPressedChange?.(val)
  });
  const groupCtx = toggleState.groupCtx;
  const toggleId = id;
  registerToggleInGroup({
    groupCtx,
    id: toggleId,
    getDisabled: () => toggleState.finalDisabled
  });

  setupToggleWarnings({
    isIconOnly: () => iconOnly,
    hasAccessibleName: () => Boolean(rest["aria-label"] || rest["aria-labelledby"]),
    isInGroup: () => groupCtx.exists,
    hasValue: () => Boolean(value),
    hasExplicitPressed: () => pressed !== false
  });

  const handlers = createToggleHandlers({
    state: toggleState,
    getValue: () => value,
    getOnClick: () => onclick
  });

  const styles = $derived(
    toggleStyles({
      variant: toggleState.finalVariant,
      size: toggleState.finalSize,
      iconOnly
    })
  );

  const toggleProps = $derived(
    mergeProps(
      {
        type: "button",
        id: toggleId,
        disabled: toggleState.finalDisabled,
        "aria-pressed": toggleState.finalPressed,
        tabindex: groupCtx.exists ? (groupCtx.isActive(toggleId) ? 0 : -1) : undefined,
        "data-slot": "toggle",
        onclick: handlers.handleClick,
        onkeydown: handlers.handleKeydown,
        onkeyup: handlers.handleKeyup,
        onblur: handlers.handleBlur,
        onfocus: () => groupCtx.setActiveId(toggleId),
        class: styles.base()
      },
      { ...rest, class: className }
    )
  );
</script>

{#snippet renderIcon(content: ToggleIconContent | undefined, position: "start" | "end")}
  {#if content}
    <span class={position === "start" ? styles.iconStart() : styles.iconEnd()}>
      {@render content()}
    </span>
  {/if}
{/snippet}

<button bind:this={ref} {...toggleProps}>
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
