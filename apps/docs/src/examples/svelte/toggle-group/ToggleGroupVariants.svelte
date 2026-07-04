<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  const variantConfigs = [
    { value: "default", label: "Default" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Ghost" }
  ] as const;
</script>

<div class="flex flex-col gap-4">
  {#each variantConfigs as variant}
    <div class="flex flex-col gap-2">
      <Description>{variant.label}</Description>
      <ToggleGroup variant={variant.value}>
        <Toggle>Left</Toggle>
        <Toggle>Center</Toggle>
        <Toggle>Right</Toggle>
      </ToggleGroup>
    </div>
  {/each}
</div>
