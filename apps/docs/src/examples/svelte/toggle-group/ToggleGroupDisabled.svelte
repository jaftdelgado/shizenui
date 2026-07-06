<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  let allDisabledValue = $state<string | undefined>(undefined);
  let overrideValue = $state<string | undefined>(undefined);
</script>

<div class="flex items-center justify-center gap-2">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col items-start gap-2">
      <Description>All toggles disabled</Description>
      <ToggleGroup disabled={true} selectionMode="single" bind:value={allDisabledValue}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="center">Center</Toggle>
        <Toggle value="right">Right</Toggle>
      </ToggleGroup>
    </div>

    <div class="flex flex-col items-start gap-2">
      <Description>Group disabled, but one toggle overrides</Description>
      <ToggleGroup disabled={true} selectionMode="single" bind:value={overrideValue}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="center">Center</Toggle>
        <Toggle disabled={false} value="right">Right (enabled)</Toggle>
      </ToggleGroup>
    </div>
  </div>
</div>
