<script lang="ts">
  import { Button, ButtonGroup, Description } from "@shizen-ui/svelte";

  const variantConfigs = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "tertiary", label: "Tertiary" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Ghost" },
    { value: "danger", label: "Danger" },
    { value: "soft-danger", label: "Soft Danger" }
  ] as const;

  const labels = ["Left", "Center", "Right"];
</script>

<div class="flex flex-col gap-4">
  {#each variantConfigs as { value, label }}
    <div class="flex flex-col gap-2">
      <Description>{label}</Description>
      <ButtonGroup variant={value}>
        {#each labels as label}
          <Button>{label}</Button>
        {/each}
      </ButtonGroup>
    </div>
  {/each}
</div>
