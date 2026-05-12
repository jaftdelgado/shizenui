<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "../../../lib/utils/cn.js";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn("switch__content", className)}>
  {@render children()}
</div>
