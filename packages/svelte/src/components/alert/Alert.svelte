<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { createId, mergeProps, presence } from "../../lib/utils/index.js";
  import { setupAlertContext, useAlertContext } from "./_internal/index.js";
  import type { AlertProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    color = "default",
    size = "md",
    id = createId("alert", uid),
    ref = $bindable(null),
    role: _role,
    ...rest
  }: AlertProps = $props();

  setupAlertContext({ id: () => id, color: () => color });
  const alertContext = useAlertContext();

  const styles = $derived(alertStyles({ color, size }));
  const liveRole = $derived(color === "danger" || color === "error" ? "alert" : "status");

  const alertProps = $derived(
    mergeProps(
      {
        id,
        role: liveRole,
        class: styles.base(),
        "aria-labelledby": alertContext.titleIds || undefined,
        "aria-describedby": alertContext.descriptionIds || undefined,
        "data-color": color,
        "data-size": size,
        "data-live": liveRole,
        "data-has-title": presence(Boolean(alertContext.titleIds)),
        "data-has-description": presence(Boolean(alertContext.descriptionIds))
      },
      { ...rest, class: className }
    )
  );
</script>

<div bind:this={ref} {...alertProps}>
  {@render children?.()}
</div>
