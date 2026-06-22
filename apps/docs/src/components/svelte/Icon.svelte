<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";

  let { icon, size = 16, strokeWidth = 1.75, ...props } = $props();
</script>

<HugeiconsIcon {icon} {size} {strokeWidth} {...props} />
