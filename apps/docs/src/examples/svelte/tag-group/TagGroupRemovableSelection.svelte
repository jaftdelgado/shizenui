<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  let files = $state([
    { value: "brief", label: "brief.pdf" },
    { value: "budget", label: "budget.xlsx" },
    { value: "logo", label: "logo.svg" },
    { value: "notes", label: "notes.md" },
    { value: "photo", label: "photo.jpg" }
  ]);

  let selected = $state<string[]>([]);

  function handleRemove(values: string[]) {
    files = files.filter((file) => !values.includes(file.value));
    // Removing a tag does not change `value`: drop the removed ones from the selection too.
    selected = selected.filter((value) => !values.includes(value));
  }
</script>

<TagGroup selectionMode="multiple" bind:value={selected} onRemove={handleRemove}>
  <Label>Attachments</Label>
  <TagGroup.List>
    {#each files as file (file.value)}
      <Tag value={file.value}>
        {file.label}
        <Tag.RemoveButton />
      </Tag>
    {/each}
  </TagGroup.List>
  <Description>
    {selected.length > 0 ? `${selected.length} selected` : "Nothing selected"}
  </Description>
</TagGroup>
