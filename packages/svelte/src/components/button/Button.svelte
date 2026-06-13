<script lang="ts">
  import { buttonStyles } from "@shizen-ui/styles";
  import { cn } from "../../lib/utils";

  import { warnIf } from "../../lib/runes/index.js";
  import type { ButtonProps, ButtonRenderState, IconContent } from "./_internal/index.js";
  import { ButtonState } from "./_internal/index.js";

  let {
    children,
    startContent,
    endContent,
    onclick,
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

  const renderState = $derived<ButtonRenderState>({ isLoading: loading });

  const styles = $derived(
    buttonStyles({
      variant: state.finalVariant,
      size: state.finalSize,
      iconOnly
    })
  );
</script>

{#snippet renderIcon(content: IconContent | undefined)}
  {#if typeof content === "string"}
    <i class={content}></i>
  {:else if content}
    <span class="button__icon">
      {@render content()}
    </span>
  {/if}
{/snippet}

<button
  {type}
  {onclick}
  disabled={state.finalDisabled}
  aria-busy={loading || undefined}
  class={cn(styles, className)}
  {...rest}
>
  <span class="button__content">
    {#if iconOnly}
      <span class="button__icon">
        {@render children?.(renderState)}
      </span>
    {:else}
      {@render renderIcon(startContent)}
      {#if children}
        <span class="button__label">
          {@render children(renderState)}
        </span>
      {/if}
      {@render renderIcon(endContent)}
    {/if}
  </span>
</button>
