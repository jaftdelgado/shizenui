<script lang="ts">
  import { inputGroupStyles } from "@shizen-ui/styles";
  import { cn, createId } from "../../../lib/utils";
  import { assertContext } from "../../../lib/runes/index.js";
  import { useFieldStateContext } from "../../../lib/index.js";
  import { useTextFieldContext } from "../../text-field/_internal/index.js";
  import {
    createInputGroupControlHandlers,
    resolveInputGroupDescribedBy,
    useInputGroupContext
  } from "../_internal/index.js";
  import type { InputGroupTextAreaProps } from "../_internal/index.js";

  const uid = $props.id();

  let {
    class: className,
    id = createId("input-group-textarea", uid),
    ref = $bindable(null),
    value = $bindable(),
    oninput,
    oninvalid,
    ...rest
  }: InputGroupTextAreaProps = $props();

  const ctx = useInputGroupContext();
  const fieldCtx = useFieldStateContext();
  const textFieldCtx = useTextFieldContext();
  const styles = $derived(inputGroupStyles());
  const describedByResult = $derived(
    resolveInputGroupDescribedBy(
      fieldCtx,
      ctx.invalid,
      textFieldCtx.exists ? textFieldCtx : undefined
    )
  );

  const handlers = createInputGroupControlHandlers<HTMLTextAreaElement>({
    textFieldCtx,
    getOnInput: () => oninput,
    getOnInvalid: () => oninvalid
  });

  function getValue(): string | undefined {
    return textFieldCtx.exists ? textFieldCtx.value : value;
  }

  function setValue(next: string | undefined): void {
    if (textFieldCtx.exists) {
      textFieldCtx.setValue(next ?? "");
      return;
    }

    value = next;
  }

  const { shouldRender } = assertContext(
    () => !ctx.exists,
    "InputGroup.TextArea",
    "Must be used inside an <InputGroup> component."
  );

  $effect(() => {
    ctx.setKind("textarea");
    ctx.setInputRef(ref);
    return () => {
      ctx.setKind(null);
      ctx.setInputRef(null);
    };
  });

  $effect(() => {
    if (!textFieldCtx.exists) return;

    textFieldCtx.setControl(ref);

    return () => {
      if (textFieldCtx.control === ref) textFieldCtx.setControl(null);
    };
  });
</script>

{#if shouldRender}
  <textarea
    bind:this={ref}
    id={ctx.inputId ?? id}
    bind:value={getValue, setValue}
    disabled={ctx.disabled}
    readonly={ctx.readonly}
    required={ctx.required}
    aria-invalid={ctx.invalid ? true : undefined}
    aria-disabled={ctx.disabled ? true : undefined}
    aria-readonly={ctx.readonly ? true : undefined}
    aria-describedby={describedByResult.describedBy}
    aria-errormessage={describedByResult.errorMessageId}
    class={cn(styles.textarea(), className)}
    oninput={handlers.handleInput}
    oninvalid={handlers.handleInvalid}
    {...rest}
  ></textarea>
{/if}
