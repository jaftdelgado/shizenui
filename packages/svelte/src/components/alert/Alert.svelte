<script lang="ts">
  import { alertStyles } from "@shizen-ui/styles";
  import { createId, mergeProps, presence } from "../../lib/utils/index.js";
  import {
    resolveAlertDescribedBy,
    resolveAlertLabelledBy,
    setupAlertContext,
    setupAlertWarnings,
    useAlertContext
  } from "./_internal/index.js";
  import { setupSurfaceContext } from "../surface/_internal/index.js";
  import type { AlertProps } from "./_internal/index.js";

  const uid = $props.id();

  let {
    children,
    class: className,
    status = "default",
    variant = "default",
    id = createId("alert", uid),
    ref = $bindable(null),
    "aria-labelledby": externalLabelledBy,
    "aria-describedby": externalDescribedBy,
    ...rest
  }: AlertProps = $props();

  setupAlertContext({ status: () => status });
  setupSurfaceContext();
  const alertContext = useAlertContext();

  setupAlertWarnings({ hasChildren: () => Boolean(children) });

  const styles = $derived(alertStyles({ variant, status }));

  const alertProps = $derived(
    mergeProps(
      {
        id,
        role: "alert",
        class: styles.base(),
        "aria-labelledby": resolveAlertLabelledBy(alertContext.titleIds, externalLabelledBy),
        "aria-describedby": resolveAlertDescribedBy(
          alertContext.descriptionIds,
          externalDescribedBy
        ),
        "data-variant": variant,
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
