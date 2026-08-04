<script lang="ts">
  import { Surface, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-72 flex-col gap-6">
  <Surface variant="default" class="flex flex-col">
    <Label>Default Surface</Label>
    <Description>Standard background with subtle elevation.</Description>
  </Surface>
  <Surface variant="secondary" class="flex flex-col">
    <Label>Secondary Surface</Label>
    <Description>Muted background for less emphasis.</Description>
  </Surface>
  <Surface variant="outline" class="flex flex-col">
    <Label>Outline Surface</Label>
    <Description>Bordered, transparent background.</Description>
  </Surface>
</div>
