<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
  import { Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <Description>Disabled toggles in their default unpressed state.</Description>
    <div class="flex items-center gap-2">
      <Toggle disabled variant="default">Default</Toggle>
      <Toggle disabled variant="outline">Outline</Toggle>
      <Toggle disabled variant="ghost">Ghost</Toggle>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Disabled toggles in their pressed (on) state.</Description>
    <div class="flex items-center gap-2">
      <Toggle disabled pressed variant="default">Default</Toggle>
      <Toggle disabled pressed variant="outline">Outline</Toggle>
      <Toggle disabled pressed variant="ghost">Ghost</Toggle>
    </div>
  </div>
</div>
