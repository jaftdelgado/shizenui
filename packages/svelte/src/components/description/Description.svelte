<script lang="ts">
  import { descriptionStyles } from "@shizen-ui/styles";
  import { cn, createId, presence } from "../../lib/utils/index.js";
  import { useFieldStateContext, useSwitchContext } from "../../lib/index.js";
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
  const switchCtx = useSwitchContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : false);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalId = $derived(
    propId ?? fieldContext.descriptionId ?? createId("description", uid)
  );

  const shouldShow = $derived(
    !finalInvalid || (fieldContext.exists && fieldContext.keepDescription)
  );

  if (switchCtx.exists) {
    switchCtx.registerDescription(finalId);
  }

  $effect(() => {
    return () => {
      if (switchCtx.exists) switchCtx.unregisterDescription(finalId);
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
    {@render children()}
  </p>
{/if}
