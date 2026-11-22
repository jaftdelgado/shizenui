<script lang="ts" module>
  import { tagStyles } from "@shizen-ui/styles";
  import { memoizeSlotClasses } from "../../lib/utils/index.js";

  const getTagSlotClasses = memoizeSlotClasses(tagStyles);
</script>

<script lang="ts">
  import { cn, createId, hasOwnAccessibleName, mergeProps } from "../../lib/utils/index.js";
  import { createFocusVisible, PressState, registerKeyed } from "../../lib/runes/index.js";
  import type { TagIconContent, TagProps } from "./_internal/index.js";
  import {
    TagState,
    getTagAttributes,
    createTagHandlers,
    setTagContext,
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
    getRef: () => ref,
    // Read when the button asks for it, so it does not matter that `slots` comes further down. The
    // return type is explicit: `slots` depends on `tagState`, and inferring it would be circular.
    removeButtonClass: (): string => slots.removeButton
  });

  // The id can change, so this is an effect: it registers again under the new id, and the cleanup
  // removes the id it captured.
  registerKeyed(() => tagState.id, tagState.registerInGroup, tagState.unregisterFromGroup);

  // The classes of every slot, resolved once per variant and size and shared by all the tags that
  // ask for the same. The remove button reads its class from the state.
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

  setTagContext(tagState);

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
    {#if tagState.removeButton && tagState.isRemovable}
      {@render tagState.removeButton()}
    {/if}
  </div>
</div>
