<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn("checkbox__content", className)}>
  {@render children()}
</div>
