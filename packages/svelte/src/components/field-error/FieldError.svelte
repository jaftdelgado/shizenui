<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { fieldErrorStyles } from "@shizen-ui/styles";
  import { useFieldStateContext } from "../../contexts/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: Snippet;
    truncate?: boolean;
    invalid?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    truncate = false,
    invalid = true,
    id: propId,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);

  const finalId = $derived(
    propId ?? (fieldContext.exists && fieldContext.id ? `${fieldContext.id}-error` : undefined)
  );
</script>

{#if finalInvalid}
  <p
    id={finalId}
    class={cn(
      fieldErrorStyles({
        truncate
      }),
      className
    )}
    data-slot="error-message"
    role="alert"
    {...rest}
  >
    {@render children()}
  </p>
{/if}
