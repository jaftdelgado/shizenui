<script lang="ts" module>
  import { tagStyles } from "@shizen-ui/styles";
  import { memoizeSlotClasses } from "../../lib/utils/index.js";

  const getTagSlotClasses = memoizeSlotClasses(tagStyles);
</script>

<script lang="ts">
  import { cn, createId, hasOwnAccessibleName, mergeProps } from "../../lib/utils/index.js";
  import {
    createFocusVisible,
    createSnippetSlot,
    PressState,
    registerKeyed
  } from "../../lib/runes/index.js";
  import type { TagIconContent, TagProps } from "./_internal/index.js";
  import {
    TagState,
    getTagAttributes,
    createTagHandlers,
    setupTagContexts,
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
    onRemove: () => onRemove,
    getRef: () => ref
  });

  // The id can change, so this is an effect: it registers again under the new id, and the cleanup
  // removes the id it captured.
  registerKeyed(() => tagState.id, tagState.registerInGroup, tagState.unregisterFromGroup);

  // The classes of every slot, resolved once per variant and size and shared by all the tags that
  // ask for the same. Declared before the contexts: the remove button reads its class from there.
  const slots = $derived(getTagSlotClasses({ variant: tagState.variant, size: tagState.size }));

  const focus = createFocusVisible();

  // An enabled tag that does something when activated (it is selectable, or it has an `onclick`)
  // shows the pressed state, and `Enter` and `Space` activate it as a click does.
  const press = new PressState({
    isDisabled: () => tagState.disabled || (!tagState.isSelectable && !onclick)
  });

  const handlers = createTagHandlers({
    state: tagState,
    focus,
    getOnClick: () => onclick
  });

  // `<Tag.RemoveButton>` is declared among the tag's children, but it is not rendered there: it
  // fills this slot with its markup, which the Tag renders below, after the element that wraps its
  // text. That element names the row and the button (`aria-labelledby`), and a button inside it
  // would add its own name to both. Only one remove button per tag is supported: the first one
  // wins.
  const removeButton = createSnippetSlot({
    component: "Tag.RemoveButton",
    message: "Only one remove button per <Tag> is supported. The extra one is not rendered."
  });

  setupTagContexts(tagState, {
    registerRemoveButton: removeButton.register,
    getRemoveButtonClass: () => slots.removeButton
  });

  setupTagWarnings({
    state: tagState,
    hasChildren: () => Boolean(children),
    getRef: () => ref
  });

  // The group context never changes after initialization.
  const inGroup = tagState.inGroup;

  const rootClass = $derived(cn(slots.base, className));

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
    <span class={position === "start" ? slots.iconStart : slots.iconEnd}>
      {@render content()}
    </span>
  {/if}
{/snippet}

<div bind:this={ref} {...tagProps}>
  <div role={inGroup ? "gridcell" : undefined} class={slots.content}>
    {@render renderIcon(startContent, "start")}
    <!-- Names the row and the remove button, so the button is rendered outside it. -->
    <span id={tagState.labelId} class={slots.label}>
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
