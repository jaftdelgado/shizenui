<script lang="ts">
  import { untrack } from "svelte";
  import { descriptionStyles } from "@shizen-ui/styles";
  import { cn, createId, presence } from "../../lib/utils/index.js";
  import { useFieldStateContext, useContentSlotContext } from "../../lib/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
    disabled?: boolean;
    id?: string;
  }

  const uid = $props.id();

  let {
    children,
    class: className,
    disabled = false,
    id: propId,
    ...rest
  }: DescriptionProps = $props();

  const fieldContext = useFieldStateContext();
  const slotCtx = useContentSlotContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : false);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);

  const registrationId = fieldContext.descriptionId ?? createId("description", uid);
  const resolvedPropId = untrack(() => propId);
  const finalId = slotCtx.exists ? registrationId : (resolvedPropId ?? registrationId);

  const shouldShow = $derived(
    !finalInvalid || (fieldContext.exists && fieldContext.keepDescription)
  );

  if (slotCtx.exists) {
    slotCtx.registerDescription(registrationId);
  }

  $effect(() => {
    return () => {
      if (slotCtx.exists) slotCtx.unregisterDescription(registrationId);
    };
  });
</script>

{#if shouldShow}
  <p
    id={finalId}
    class={cn(descriptionStyles(), className)}
    data-slot="description"
    data-disabled={presence(finalDisabled)}
    data-invalid={presence(finalInvalid)}
    {...rest}
  >
    {@render children?.()}
  </p>
{/if}
