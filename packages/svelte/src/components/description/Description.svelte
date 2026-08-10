<script lang="ts">
  import { descriptionStyles } from "@shizen-ui/styles";
  import { createId, mergeProps, presence } from "../../lib/utils/index.js";
  import { useFieldStateContext, useContentSlotContext } from "../../lib/index.js";
  import type { DescriptionProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    disabled = false,
    id: propId,
    ref = $bindable(null),
    ...rest
  }: DescriptionProps = $props();

  const fieldContext = useFieldStateContext();
  const slotCtx = useContentSlotContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : false);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);

  const registrationId = fieldContext.descriptionId ?? createId("description", uid);
  const finalId = $derived(slotCtx.exists ? registrationId : (propId ?? registrationId));

  const shouldShow = $derived(
    !finalInvalid || (fieldContext.exists && fieldContext.keepDescription)
  );

  $effect(() => {
    if (!slotCtx.exists) return;

    if (shouldShow) {
      slotCtx.registerDescription(registrationId);
    }

    return () => {
      slotCtx.unregisterDescription(registrationId);
    };
  });

  const descriptionProps = $derived(
    mergeProps(
      {
        id: finalId,
        class: descriptionStyles(),
        "data-slot": "description",
        "data-disabled": presence(finalDisabled),
        "data-invalid": presence(finalInvalid)
      },
      { ...rest, class: className }
    )
  );
</script>

{#if shouldShow}
  <span bind:this={ref} {...descriptionProps}>
    {@render children?.()}
  </span>
{/if}
