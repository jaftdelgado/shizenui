<script lang="ts">
  import { Tag, TagGroup, Label } from "@shizen-ui/svelte";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium (default)" },
    { value: "lg", label: "Large" }
  ] as const;

  const options = ["PNG", "JPEG", "SVG", "PDF"];
</script>

<div class="flex flex-col gap-6">
  {#each sizes as { value, label }}
    <TagGroup selectionMode="single" size={value}>
      <Label>{label}</Label>
      <TagGroup.List>
        {#each options as option}
          <Tag value={option}>{option}</Tag>
        {/each}
      </TagGroup.List>
    </TagGroup>
  {/each}
</div>
