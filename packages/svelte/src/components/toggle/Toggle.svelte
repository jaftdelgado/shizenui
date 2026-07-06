<script lang="ts">
  import { toggleStyles } from "@shizen-ui/styles";
  import { cn, createId } from "../../lib/utils";
  import { warnIf } from "../../lib/runes/index.js";
  import type { ToggleProps, IconContent } from "./_internal/index.js";
  import {
    ToggleState,
    createToggleHandlers,
    setupToggleGroupRegistration
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    startContent,
    endContent,
    class: className,
    variant,
    size,
    disabled,
    value = undefined,
    iconOnly = false,
    pressed = $bindable(false),
    onPressedChange,
    onclick,
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
    disabled: () => disabled,
    value: () => value,
    getPressed: () => pressed,
    setPressed: (val) => {
      pressed = val;
    },
    onPressedChange: (val) => onPressedChange?.(val)
  });
  const groupCtx = state.groupCtx;
  const toggleId = createId("toggle", uid);
  setupToggleGroupRegistration({
    groupCtx,
    id: toggleId,
    getRef: () => ref,
    getDisabled: () => state.finalDisabled
  });

  warnIf(
    () => groupCtx.exists && !value,
    "Toggle",
    "Toggle inside a ToggleGroup requires a 'value' prop to participate in selection."
  );

  warnIf(
    () => groupCtx.exists && pressed !== false,
    "Toggle",
    "Toggle inside a ToggleGroup: 'pressed' prop is ignored. Use ToggleGroup's value instead."
  );

  const handlers = createToggleHandlers({
    state,
    getValue: () => value,
    getOnClick: () => onclick
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
  type="button"
  disabled={state.finalDisabled}
  aria-pressed={state.finalPressed}
  tabindex={groupCtx.exists ? (groupCtx.isActive(toggleId) ? 0 : -1) : undefined}
  onclick={handlers.handleClick}
  onkeydown={handlers.handleKey}
  onkeyup={handlers.handleKey}
  onblur={handlers.handleBlur}
  onfocus={() => groupCtx.setActive(toggleId)}
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
