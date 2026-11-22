<script lang="ts">
  import { onDestroy } from "svelte";
  import { cn, mergeProps } from "../../../lib/utils/index.js";
  import { PressState } from "../../../lib/runes/index.js";
  import { XIcon } from "../../../lib/icons/index.js";
  import {
    createTagRemoveButtonHandlers,
    getTagRemoveButtonAttributes,
    setupTagRemoveButtonWarnings,
    useTagContext
  } from "../_internal/index.js";
  import type { TagRemoveButtonProps } from "../_internal/index.js";

  let {
    children,
    ref = $bindable(null),
    class: className,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  }: TagRemoveButtonProps = $props();

  const tagCtx = useTagContext();

  setupTagRemoveButtonWarnings({ tagCtx });

  // The context never changes during the life of the button, so this is decided once.
  const shouldRender = tagCtx.exists;

  const press = new PressState({ isDisabled: () => tagCtx.disabled });

  // The press events reach the tag too: its PressState ignores a press on a focusable child.
  const handlers = mergeProps(press.props, createTagRemoveButtonHandlers(tagCtx));

  const buttonProps = $derived(
    mergeProps(
      {
        ...getTagRemoveButtonAttributes(tagCtx, {
          id: id ?? tagCtx.removeButtonId,
          ariaLabel,
          ariaLabelledby,
          pressed: press.isPressed
        }),
        ...handlers,
        class: cn(tagCtx.removeButtonClass, className)
      },
      rest
    )
  );

  // The button is not rendered here, among the tag's children (inside the element that names the
  // row): the Tag renders this snippet after its text (see the `removeButton` slot in Tag.svelte).
  if (shouldRender) onDestroy(tagCtx.registerRemoveButton(button));
</script>

{#snippet button()}
  <button bind:this={ref} {...buttonProps}>
    {#if children}
      {@render children()}
    {:else}
      <XIcon />
    {/if}
  </button>
{/snippet}
