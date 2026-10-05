<script lang="ts">
  import { tagStyles } from "@shizen-ui/styles";

  import { mergeProps } from "../../../lib/utils";
  import { XIcon } from "../../../lib/icons/index.js";
  import { assertContext, warnIf } from "../../../lib/runes/index.js";
  import { useTagContext } from "../_internal/index.js";
  import type { TagRemoveButtonProps } from "../_internal/index.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    "aria-label": ariaLabel,
    ...rest
  }: TagRemoveButtonProps = $props();

  const tagCtx = useTagContext();
  const styles = $derived(tagStyles());

  const { shouldRender } = assertContext(
    () => !tagCtx.exists,
    "Tag.RemoveButton",
    "Must be used inside a <Tag> component."
  );

  warnIf(
    () => tagCtx.exists && !tagCtx.isRemovable,
    "Tag.RemoveButton",
    "Neither the Tag nor its TagGroup has an `onRemove` handler, so the button is not rendered. Pass `onRemove` to <Tag> or <TagGroup>."
  );

  const defaultLabel = $derived(tagCtx.textValue ? `Remove ${tagCtx.textValue}` : "Remove");

  const buttonProps = $derived(
    mergeProps(
      {
        type: "button" as const,
        tabindex: -1,
        "aria-label": ariaLabel ?? defaultLabel,
        disabled: tagCtx.disabled,
        "data-slot": "tag-remove-button",
        class: styles.removeButton(),
        onclick: (e: MouseEvent) => {
          e.stopPropagation();
          tagCtx.requestRemove();
        },
        onmousedown: (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldRender && tagCtx.isRemovable}
  <button bind:this={ref} {...buttonProps}>
    {#if children}
      {@render children()}
    {:else}
      <XIcon />
    {/if}
  </button>
{/if}
