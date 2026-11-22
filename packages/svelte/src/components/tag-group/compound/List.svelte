<script lang="ts" module>
  import { tagGroupStyles } from "@shizen-ui/styles";
  import { resolveSlotClasses } from "../../../lib/utils/index.js";

  const classes = resolveSlotClasses(tagGroupStyles());
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { cn, hasOwnAccessibleName, mergeProps } from "../../../lib/utils/index.js";
  import {
    createTagGroupListHandlers,
    getTagGroupListAttributes,
    setupTagGroupListWarnings,
    useTagGroupContext
  } from "../_internal/index.js";
  import type { TagGroupListApi, TagGroupListProps } from "../_internal/index.js";

  const listUid = $props.id();

  let { children, class: className, ref = $bindable(null), ...rest }: TagGroupListProps = $props();

  const groupCtx: TagGroupListApi = useTagGroupContext();

  const handlers = createTagGroupListHandlers({
    getContainer: () => ref,
    groupCtx
  });

  const rootClass = $derived(cn(classes.list, className));

  const listProps = $derived(
    mergeProps(
      {
        ...getTagGroupListAttributes(groupCtx, {
          "aria-label": rest["aria-label"],
          "aria-labelledby": rest["aria-labelledby"],
          "aria-describedby": rest["aria-describedby"]
        }),
        class: rootClass,
        ...handlers.props
      },
      rest
    )
  );

  setupTagGroupListWarnings({
    groupCtx,
    hasChildren: () => Boolean(children),
    hasAccessibleName: () => hasOwnAccessibleName(listProps)
  });

  // The context never changes during the life of the list, so this is decided once.
  const shouldRender = groupCtx.exists;

  // The id is constant: register while initializing so the list also exists on the server. Outside
  // a group the context is a no-op.
  groupCtx.registerList(listUid, () => ref);

  onDestroy(() => {
    groupCtx.unregisterList(listUid);
    handlers.destroy();
  });
</script>

{#if shouldRender}
  <div bind:this={ref} {...listProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
