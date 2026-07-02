<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";
</script>

<div class="flex items-center justify-center gap-2">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col items-start gap-2">
      <Description>All toggles disabled</Description>
      <ToggleGroup disabled={true}>
        <Toggle>Left</Toggle>
        <Toggle>Center</Toggle>
        <Toggle>Right</Toggle>
      </ToggleGroup>
    </div>

    <div class="flex flex-col items-start gap-2">
      <Description>Group disabled, but one toggle overrides</Description>
      <ToggleGroup disabled={true}>
        <Toggle>Left</Toggle>
        <Toggle>Center</Toggle>
        <Toggle disabled={false}>Right (enabled)</Toggle>
      </ToggleGroup>
    </div>
  </div>
</div>
