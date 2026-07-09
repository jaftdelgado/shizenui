<script lang="ts">
  import { labelStyles } from "@shizen-ui/styles";
  import { cn, createId, presence } from "../../lib/utils";
  import { useFieldStateContext, useContentSlotContext } from "../../lib/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLElement> {
    children: Snippet;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    for?: string;
  }

  const uid = $props.id();

  let {
    children,
    class: className,
    required = false,
    invalid = false,
    disabled = false,
    for: htmlFor,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();
  const slotCtx = useContentSlotContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalRequired = $derived(fieldContext.exists ? fieldContext.required : required);
  const finalFor = $derived(htmlFor ?? (fieldContext.exists ? fieldContext.inputId : undefined));

  const registrationId = fieldContext.labelId ?? createId("label", uid);
  const labelId = $derived(
    fieldContext.exists ? (fieldContext.labelId ?? registrationId) : undefined
  );

  const { base, requiredIndicator } = labelStyles();

  if (slotCtx.exists) {
    slotCtx.registerLabel(registrationId);
  }

  $effect(() => {
    return () => {
      if (slotCtx.exists) slotCtx.unregisterLabel(registrationId);
    };
  });
</script>

{#if finalFor}
  <label
    for={finalFor}
    id={labelId}
    class={cn(base({ invalid: finalInvalid }), className)}
    data-invalid={presence(finalInvalid)}
    data-disabled={presence(finalDisabled)}
    data-required={presence(finalRequired)}
    {...rest}
  >
    {@render children()}

    {#if finalRequired}
      <span class={requiredIndicator()} aria-hidden="true" data-slot="required-indicator"> * </span>
    {/if}
  </label>
{:else}
  <span
    id={labelId}
    class={cn(base({ invalid: finalInvalid }), className)}
    data-invalid={presence(finalInvalid)}
    data-disabled={presence(finalDisabled)}
    data-required={presence(finalRequired)}
    {...rest}
  >
    {@render children()}

    {#if finalRequired}
      <span class={requiredIndicator()} aria-hidden="true" data-slot="required-indicator"> * </span>
    {/if}
  </span>
{/if}
