<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  const variants = [
    {
      value: "default",
      label: "Default variant",
      description: "Standard tag style."
    },
    {
      value: "secondary",
      label: "Secondary variant",
      description: "Alternate, lower-emphasis style."
    }
  ] as const;

  const options = ["Sneakers", "Jackets", "Accessories", "Backpacks", "Hats", "Watches"];
</script>

<div class="flex w-full max-w-xs flex-col gap-6">
  {#each variants as { value, label, description }}
    <TagGroup selectionMode="multiple" variant={value}>
      <Label>{label}</Label>
      <TagGroup.List>
        {#each options as option}
          <Tag value={option}>{option}</Tag>
        {/each}
      </TagGroup.List>
      <Description>{description}</Description>
    </TagGroup>
  {/each}
</div>
