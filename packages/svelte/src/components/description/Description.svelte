<script lang="ts">
  import { descriptionStyles } from "@shizen-ui/styles";
  import { cn, createId } from "../../lib/utils/index.js";
  import { useFieldStateContext } from "../../lib/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: Snippet;
    disabled?: boolean;
    id?: string;
  }

  const uid = $props.id();

  let { children, class: className, disabled = false, id: propId, ...rest }: Props = $props();

  const fieldContext = useFieldStateContext();
  fieldContext.registerDescription?.();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : false);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalId = $derived(
    propId ??
      (fieldContext.exists && fieldContext.id
        ? `${fieldContext.id}-description`
        : createId("description", uid))
  );

  const shouldShow = $derived(
    !finalInvalid || (fieldContext.exists && fieldContext.keepDescription)
  );
</script>

{#if shouldShow}
  <p
    id={finalId}
    class={cn(descriptionStyles(), className)}
    data-slot="description"
    data-disabled={finalDisabled ? "" : undefined}
    data-invalid={finalInvalid ? "" : undefined}
    {...rest}
  >
    {@render children()}
  </p>
{/if}
