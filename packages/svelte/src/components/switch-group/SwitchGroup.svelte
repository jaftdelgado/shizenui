<script lang="ts">
  import { switchGroupStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import { warnIf } from "../../lib/runes/index.js";
  import type { SwitchGroupProps } from "./_internal/index.js";
  import {
    SwitchGroupState,
    setupSwitchGroupContexts,
    useSwitchGroupContext
  } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    disabled = undefined,
    readonly = undefined,
    size = "md",
    orientation = "vertical",
    id = createId("switch-group", uid),
    ref = $bindable(null),
    ...rest
  }: SwitchGroupProps = $props();

  warnIf(
    () => !children,
    "SwitchGroup",
    "No children provided. Add at least one <Switch> as a child."
  );

  const switchGroupState = new SwitchGroupState({
    disabled: () => disabled,
    readonly: () => readonly,
    size: () => size,
    orientation: () => orientation
  });

  setupSwitchGroupContexts(switchGroupState, {
    id: () => id
  });

  const ctx = useSwitchGroupContext();

  warnIf(
    () => !ctx.hasLabel && !rest["aria-label"],
    "SwitchGroup",
    "No Label found. Add a <Label> as a child, or pass aria-label directly."
  );

  const styles = $derived(switchGroupStyles({ orientation: switchGroupState.finalOrientation }));
</script>

<div
  bind:this={ref}
  role="group"
  {id}
  class={cn(styles.base(), className)}
  aria-labelledby={ctx.hasLabel ? ctx.labelId : undefined}
  aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
  data-disabled={presence(switchGroupState.finalDisabled)}
  data-readonly={presence(switchGroupState.finalReadonly)}
  data-orientation={switchGroupState.finalOrientation}
  {...rest}
>
  {@render children?.()}
</div>
