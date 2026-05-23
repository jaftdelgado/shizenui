<script lang="ts">
  import { switchGroupStyles } from "@shizen-ui/styles";

  import { cn, createId, presence } from "../../lib/utils";
  import type { SwitchGroupProps } from "./_internal/index.js";
  import {
    SwitchGroupState,
    setupSwitchGroupContexts
  } from "./_internal/index.js";
  import { warnIf } from "../../lib/runes/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    disabled = false,
    readonly = false,
    size = "md",
    orientation = "vertical",
    id = createId("switch-group", uid),
    ...rest
  }: SwitchGroupProps = $props();

  warnIf(
    () => !children,
    "SwitchGroup",
    "No children provided. Add <SwitchGroup.Items> as a child."
  );

  const switchGroupState = new SwitchGroupState({
    disabled: () => disabled,
    readonly: () => readonly,
    size: () => size,
    orientation: () => orientation
  });

  const { getLabelId, getDescriptionId } = setupSwitchGroupContexts(
    switchGroupState,
    {
      id: () => id
    }
  );

  const styles = $derived(
    switchGroupStyles({ orientation: switchGroupState.finalOrientation })
  );
</script>

<div
  role="group"
  {id}
  class={cn(styles.base(), className)}
  aria-labelledby={getLabelId()}
  aria-describedby={getDescriptionId()}
  data-disabled={presence(switchGroupState.finalDisabled)}
  data-readonly={presence(switchGroupState.finalReadonly)}
  data-orientation={switchGroupState.finalOrientation}
  {...rest}
>
  {@render children()}
</div>
