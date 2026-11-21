<script lang="ts" module>
  import { tagStyles } from "@shizen-ui/styles";
  import { memoizeVariants } from "../../lib/utils/index.js";

  const getTagSlots = memoizeVariants(tagStyles);
</script>

<script lang="ts">
  import { cn, createId, hasOwnAccessibleName, mergeProps } from "../../lib/utils/index.js";
  import { createFocusVisible, PressState } from "../../lib/runes/index.js";
  import type { TagIconContent, TagProps } from "./_internal/index.js";
  import {
    TagState,
    getTagAttributes,
    createTagHandlers,
    createTagRemoveButtonSlot,
    setupTagContexts,
    setupTagGroupRegistration,
    setupTagWarnings
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    value,
    disabled,
    id: idProp,
    ref = $bindable(null),
    onclick,
    onRemove,
    children,
    startContent,
    endContent,
    ...rest
  }: TagProps = $props();

  // The resolved id always feeds the state and the registry; only an explicit one is rendered
  // outside a group.
  const id = $derived(idProp ?? createId("tag", uid));

  const tagState = new TagState({
    value: () => value,
    disabled: () => disabled,
    id: () => id,
    onRemove: () => onRemove
  });

  setupTagGroupRegistration(tagState);

  const focus = createFocusVisible();

  // An enabled tag that does something when activated (it is selectable, or it has an `onclick`)
  // shows the pressed state, and `Enter` and `Space` activate it as a click does.
  const press = new PressState({
    isDisabled: () => tagState.disabled || (!tagState.isSelectable && !onclick)
  });

  const handlers = createTagHandlers({
    state: tagState,
    focus,
    getRef: () => ref,
    getOnClick: () => onclick
  });

  // A `<Tag.RemoveButton>` among the children fills this slot with its markup, rendered below,
  // after the text.
  const removeButton = createTagRemoveButtonSlot();

  setupTagContexts(tagState, {
    requestRemove: handlers.requestRemove,
    registerRemoveButton: removeButton.register
  });

  setupTagWarnings({
    state: tagState,
    hasChildren: () => Boolean(children)
  });

  // The group context never changes after initialization.
  const inGroup = tagState.inGroup;

  const styles = $derived(getTagSlots({ variant: tagState.variant, size: tagState.size }));

  const rootClass = $derived(cn(styles.base(), className));

  // `keydown` and `blur` have a handler in each: mergeProps composes them, PressState's first.
  const rowHandlers = mergeProps(press.props, handlers.props);

  const tagProps = $derived(
    mergeProps(
      {
        ...getTagAttributes(tagState, {
          idProp,
          focusVisible: focus.isFocusVisible,
          pressed: press.isPressed,
          hasOwnName: hasOwnAccessibleName(rest)
        }),
        ...rowHandlers,
        class: rootClass
      },
      rest
    )
  );
</script>

{#snippet renderIcon(content: TagIconContent | undefined, position: "start" | "end")}
  {#if content}
    <span class={position === "start" ? styles.iconStart() : styles.iconEnd()}>
      {@render content()}
    </span>
  {/if}
{/snippet}

<div bind:this={ref} {...tagProps}>
  <div role={inGroup ? "gridcell" : undefined} class={styles.content()}>
    {@render renderIcon(startContent, "start")}
    <!-- Names the row and the remove button, so the button is rendered outside it. -->
    <span id={tagState.labelId} class={styles.label()}>
      {#if children}
        {@render children()}
      {/if}
    </span>
    {@render renderIcon(endContent, "end")}
    {#if removeButton.current && tagState.isRemovable}
      {@render removeButton.current()}
    {/if}
  </div>
</div>
