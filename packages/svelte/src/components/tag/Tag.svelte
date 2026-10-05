<script lang="ts">
  import { tagStyles } from "@shizen-ui/styles";

  import { createId, mergeProps, presence } from "../../lib/utils";
  import { createFocusVisible } from "../../lib/runes/index.js";
  import type { TagProps } from "./_internal/index.js";
  import {
    TagState,
    createTagHandlers,
    setupTagContexts,
    setupTagGroupRegistration,
    setupTagWarnings
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    value,
    textValue,
    disabled = undefined,
    id = createId("tag", uid),
    ref = $bindable(null),
    onclick,
    onRemove,
    children,
    ...rest
  }: TagProps = $props();

  const tagState = new TagState({
    value: () => value,
    disabled: () => disabled,
    id: () => id,
    textValue: () => textValue,
    onRemove: () => onRemove
  });

  setupTagGroupRegistration(tagState);

  const focus = createFocusVisible();

  const handlers = createTagHandlers({
    state: tagState,
    focus,
    getRef: () => ref,
    getOnClick: () => onclick
  });

  setupTagContexts(tagState, { requestRemove: handlers.requestRemove });

  setupTagWarnings({
    state: tagState,
    hasChildren: () => Boolean(children)
  });

  const groupExists = $derived(tagState.groupCtx.exists);

  const styles = $derived(tagStyles({ variant: tagState.finalVariant, size: tagState.finalSize }));

  const tagProps = $derived(
    mergeProps(
      {
        ...(groupExists
          ? {
              id,
              role: "row",
              tabindex: tagState.groupCtx.isActive(id) ? 0 : -1,
              "aria-label": textValue,
              "aria-selected": tagState.isSelectable ? tagState.isSelected : undefined,
              "aria-disabled": tagState.finalDisabled ? true : undefined
            }
          : {}),
        "data-slot": "tag",
        "data-selectable": presence(tagState.isInteractive),
        "data-selected": presence(tagState.isSelected),
        "data-disabled": presence(tagState.finalDisabled),
        "data-removable": presence(tagState.isRemovable),
        "data-focus-visible": presence(focus.isFocusVisible),
        onclick: handlers.handleClick,
        onkeydown: handlers.handleKeydown,
        onkeyup: handlers.handleKeydown,
        onmousedown: handlers.handleMouseDown,
        onmouseup: handlers.handleMouseUp,
        onmouseleave: handlers.handleMouseLeave,
        onfocus: handlers.handleFocus,
        onblur: focus.onBlur,
        class: styles.base()
      },
      { ...rest, class: className }
    )
  );
</script>

<div bind:this={ref} {...tagProps}>
  <div role={groupExists ? "gridcell" : undefined} class={styles.content()}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
