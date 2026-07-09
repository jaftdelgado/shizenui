<script lang="ts">
  import { cn, createId } from "../../lib/utils";
  import { fieldErrorStyles } from "@shizen-ui/styles";
  import { useFieldStateContext, useContentSlotContext } from "../../lib/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
    invalid?: boolean;
    id?: string;
  }

  const uid = $props.id();

  let {
    children,
    class: className,
    invalid = true,
    id: propId,
    ...rest
  }: FieldErrorProps = $props();

  const fieldContext = useFieldStateContext();
  const slotCtx = useContentSlotContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);

  const registrationId = fieldContext.errorId ?? createId("error", uid);
  const finalId = $derived(
    propId ?? (fieldContext.exists ? (fieldContext.errorId ?? registrationId) : registrationId)
  );

  if (slotCtx.exists) {
    slotCtx.registerError(registrationId);
  }

  $effect(() => {
    return () => {
      if (slotCtx.exists) slotCtx.unregisterError(registrationId);
    };
  });
</script>

{#if finalInvalid}
  <p
    id={finalId}
    class={cn(fieldErrorStyles(), className)}
    data-slot="error-message"
    role="alert"
    {...rest}
  >
    {@render children?.()}
  </p>
{/if}
