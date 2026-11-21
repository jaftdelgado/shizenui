<script lang="ts" module>
  import { tagGroupStyles } from "@shizen-ui/styles";

  const styles = tagGroupStyles();
</script>

<script lang="ts">
  import { cn, createId, mergeProps } from "../../lib/utils/index.js";
  import type { TagGroupProps } from "./_internal/index.js";
  import {
    TagGroupState,
    getTagGroupAttributes,
    setupTagGroupContexts,
    setupTagGroupWarnings
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    value = $bindable(),
    selectionMode = "none",
    onValueChange,
    onRemove,
    disabled,
    invalid,
    variant,
    size,
    id = createId("tag-group", uid),
    ref = $bindable(null),
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  }: TagGroupProps = $props();

  const tagGroupState = new TagGroupState({
    selectionMode: () => selectionMode,
    value: () => value,
    setValue: (nextValue) => {
      value = nextValue as typeof value;
    },
    onValueChange: () => onValueChange,
    onRemove: () => onRemove,
    disabled: () => disabled,
    invalid: () => invalid,
    variant: () => variant,
    size: () => size,
    id: () => id,
    ariaLabel: () => ariaLabel ?? undefined,
    ariaLabelledby: () => ariaLabelledby ?? undefined
  });

  setupTagGroupContexts(tagGroupState);

  setupTagGroupWarnings({
    context: tagGroupState,
    hasChildren: () => Boolean(children)
  });

  const rootClass = $derived(cn(styles.base(), className));

  const groupProps = $derived(
    mergeProps(
      {
        id,
        ...getTagGroupAttributes(tagGroupState),
        class: rootClass
      },
      rest
    )
  );
</script>

<div bind:this={ref} {...groupProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
