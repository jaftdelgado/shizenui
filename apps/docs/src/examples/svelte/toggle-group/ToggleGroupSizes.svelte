<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  const sizeConfigs = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium (default)" },
    { value: "lg", label: "Large" }
  ] as const;

  const labels = ["Left", "Center", "Right"];

  let selectedBySize = $state<Record<(typeof sizeConfigs)[number]["value"], string | undefined>>({
    sm: undefined,
    md: undefined,
    lg: undefined
  });
</script>

<div class="flex flex-col gap-4">
  {#each sizeConfigs as { value, label }}
    <div class="flex flex-col gap-2">
      <Description>{label}</Description>
      <ToggleGroup size={value} selectionMode="single" bind:value={selectedBySize[value]}>
        {#each labels as label}
          <Toggle value={label.toLowerCase()}>{label}</Toggle>
        {/each}
      </ToggleGroup>
    </div>
  {/each}
</div>
