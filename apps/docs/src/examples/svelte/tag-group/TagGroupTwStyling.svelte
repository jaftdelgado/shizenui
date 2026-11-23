<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  const views = [
    { value: "all", label: "All tasks" },
    { value: "mine", label: "Assigned to me" },
    { value: "overdue", label: "Overdue" },
    { value: "completed", label: "Completed" }
  ];

  let view = $state("all");
</script>

<div class="flex w-full max-w-sm flex-col">
  <TagGroup selectionMode="single" bind:value={view} class="gap-0">
    <Label>Show tasks by</Label>
    <Description>Choose how your task list is filtered.</Description>
    <TagGroup.List class="mt-4">
      {#each views as item (item.value)}
        <Tag
          value={item.value}
          class="rounded-lg bg-transparent hover:bg-neutral-200 data-pressed:bg-neutral-200 data-selected:bg-neutral-900 data-selected:text-white data-selected:hover:bg-neutral-800 data-selected:data-pressed:bg-neutral-700"
        >
          {item.label}
        </Tag>
      {/each}
    </TagGroup.List>
  </TagGroup>
</div>
