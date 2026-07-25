<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { inputStyles, type InputVariants } from "@shizen-ui/styles";
  import { useFieldStateContext, useSurfaceContext } from "../../contexts/index.js";
  import { useInputGroupContext } from "../../contexts/internal/index.js";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size"> {
    size?: InputVariants["size"];
    variant?: InputVariants["variant"];
    value?: string;
    invalid?: boolean;
  }

  let {
    class: className,
    size = "md",
    variant = undefined,
    type = "text",
    disabled = false,
    invalid = false,
    id: propId,
    value = $bindable(""),
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();
  const groupContext = useInputGroupContext();
  const surfaceContext = useSurfaceContext();

  const finalVariant = $derived(variant ?? (surfaceContext.exists ? "secondary" : "default"));

  const finalInvalid = $derived(
    fieldContext.exists
      ? fieldContext.invalid
      : groupContext.exists
        ? groupContext.invalid || invalid
        : invalid
  );

  const finalDisabled = $derived(
    fieldContext.exists
      ? fieldContext.disabled
      : groupContext.exists
        ? groupContext.disabled || disabled
        : disabled
  );

  const finalId = $derived(propId ?? (fieldContext.exists ? fieldContext.id : undefined));
  const activeSize = $derived(groupContext.exists ? groupContext.size : size);

  const descriptionId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-description` : undefined
  );
  const errorId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-error` : undefined
  );
</script>

<input
  id={finalId}
  {type}
  disabled={finalDisabled}
  bind:value
  class={cn(inputStyles({ size: activeSize, variant: finalVariant }), className)}
  aria-invalid={finalInvalid}
  aria-describedby={!finalInvalid ? descriptionId : undefined}
  aria-errormessage={finalInvalid ? errorId : undefined}
  data-invalid={finalInvalid}
  data-in-group={groupContext.inGroup}
  data-slot={groupContext.inGroup ? "input-group-input" : undefined}
  {...rest}
/>
