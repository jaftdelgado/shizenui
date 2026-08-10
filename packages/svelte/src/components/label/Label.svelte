<script lang="ts">
  import { labelStyles } from "@shizen-ui/styles";
  import { createId, mergeProps, presence } from "../../lib/utils/index.js";
  import { useFieldStateContext, useContentSlotContext } from "../../lib/index.js";
  import type { LabelProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    id: propId,
    ref = $bindable(null),
    required = false,
    invalid = false,
    disabled = false,
    for: htmlFor,
    ...rest
  }: LabelProps = $props();

  const fieldContext = useFieldStateContext();
  const slotCtx = useContentSlotContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalRequired = $derived(fieldContext.exists ? fieldContext.required : required);
  const finalFor = $derived(htmlFor ?? (fieldContext.exists ? fieldContext.inputId : undefined));

  const registrationId = fieldContext.labelId ?? createId("label", uid);
  const labelId = $derived(fieldContext.exists ? (fieldContext.labelId ?? registrationId) : propId);

  const { base, requiredIndicator } = labelStyles();

  if (slotCtx.exists) {
    slotCtx.registerLabel(registrationId);
  }

  $effect(() => {
    return () => {
      if (slotCtx.exists) slotCtx.unregisterLabel(registrationId);
    };
  });

  const commonProps = $derived({
    id: labelId,
    class: base({ invalid: finalInvalid }),
    "data-invalid": presence(finalInvalid),
    "data-disabled": presence(finalDisabled),
    "data-required": presence(finalRequired),
    "data-slot": "label"
  });

  const labelProps = $derived(
    mergeProps({ ...commonProps, for: finalFor }, { ...rest, class: className })
  );

  const spanProps = $derived(mergeProps(commonProps, { ...rest, class: className }));
</script>

{#if finalFor}
  <label bind:this={ref} {...labelProps}>
    {@render children?.()}

    {#if finalRequired}
      <span class={requiredIndicator()} aria-hidden="true" data-slot="required-indicator"> * </span>
    {/if}
  </label>
{:else}
  <span bind:this={ref} {...spanProps}>
    {@render children?.()}

    {#if finalRequired}
      <span class={requiredIndicator()} aria-hidden="true" data-slot="required-indicator"> * </span>
    {/if}
  </span>
{/if}
