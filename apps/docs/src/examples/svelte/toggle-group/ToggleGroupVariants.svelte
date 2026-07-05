<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  const variantConfigs = [
    { value: "default", label: "Default" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Ghost" }
  ] as const;

  let selectedByVariant = $state<Record<(typeof variantConfigs)[number]["value"], string | undefined>>({
    default: undefined,
    outline: undefined,
    ghost: undefined
  });
</script>

<div class="flex flex-col gap-4">
  {#each variantConfigs as variant}
    <div class="flex flex-col gap-2">
      <Description>{variant.label}</Description>
      <ToggleGroup variant={variant.value} selectionMode="single" bind:value={selectedByVariant[variant.value]}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="center">Center</Toggle>
        <Toggle value="right">Right</Toggle>
      </ToggleGroup>
    </div>
  {/each}
</div>
