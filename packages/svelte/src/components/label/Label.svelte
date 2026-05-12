<script lang="ts">
  import { labelStyles } from "@shizen-ui/styles";
  import { cn } from "../../lib/utils";
  import { useFieldStateContext } from "../../lib/index.js";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLLabelAttributes {
    children: Snippet;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    for?: string;
  }

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

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalRequired = $derived(fieldContext.exists ? fieldContext.required : required);
  const finalFor = $derived(htmlFor ?? (fieldContext.exists ? fieldContext.id : undefined));

  const { base, requiredIndicator } = labelStyles();
</script>

<label
  for={finalFor}
  class={cn(base({ invalid: finalInvalid }), className)}
  data-invalid={finalInvalid}
  data-disabled={finalDisabled}
  data-required={finalRequired}
  {...rest}
>
  {@render children()}

  {#if finalRequired}
    <span class={requiredIndicator()} aria-hidden="true" data-slot="required-indicator"> * </span>
  {/if}
</label>
