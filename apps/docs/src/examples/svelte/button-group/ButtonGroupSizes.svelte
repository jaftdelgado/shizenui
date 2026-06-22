<script lang="ts">
  import { Button, ButtonGroup, Description } from "@shizen-ui/svelte";

  const sizeConfigs = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium (default)" },
    { value: "lg", label: "Large" }
  ] as const;

  const labels = ["Left", "Center", "Right"];
</script>

<div class="flex flex-col gap-4">
  {#each sizeConfigs as { value, label }}
    <div class="flex flex-col gap-2">
      <Description>{label}</Description>
      <ButtonGroup size={value} variant="secondary">
        {#each labels as label}
          <Button>{label}</Button>
        {/each}
      </ButtonGroup>
    </div>
  {/each}
</div>
