<script lang="ts">
  import { createId, mergeProps } from "../../lib/utils/index.js";
  import { fieldErrorStyles } from "@shizen-ui/styles";
  import { useFieldStateContext, useContentSlotContext } from "../../lib/contexts/index.js";
  import { registerWhile } from "../../lib/runes/index.js";
  import type { FieldErrorProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    invalid = true,
    id: propId,
    ref = $bindable(null),
    ...rest
  }: FieldErrorProps = $props();

  const fieldContext = useFieldStateContext();
  const slotCtx = useContentSlotContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);

  const registrationId = fieldContext.errorId ?? createId("error", uid);
  const finalId = $derived(
    propId ?? (fieldContext.exists ? (fieldContext.errorId ?? registrationId) : registrationId)
  );

  // Registered only while invalid, which is reactive: see registerWhile.
  registerWhile(
    () => slotCtx.exists && finalInvalid,
    () => slotCtx.registerError(registrationId),
    () => slotCtx.unregisterError(registrationId)
  );

  const fieldErrorProps = $derived(
    mergeProps(
      {
        id: finalId,
        class: fieldErrorStyles(),
        "data-slot": "error-message",
        role: "alert"
      },
      { ...rest, class: className }
    )
  );
</script>

{#if finalInvalid}
  <span bind:this={ref} {...fieldErrorProps}>
    {@render children?.()}
  </span>
{/if}
