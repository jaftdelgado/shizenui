<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  const priorities = ["Low", "Medium", "High", "Urgent"];
  const labels = ["Bug", "Feature", "Documentation", "Design", "Performance", "Refactor"];

  let priority = $state("Medium");
  let issueLabels = $state(["Bug", "Performance"]);
</script>

<div class="flex max-w-xs flex-col gap-6">
  <TagGroup selectionMode="single" bind:value={priority}>
    <Label>Single Selection</Label>
    <TagGroup.List>
      {#each priorities as item}
        <Tag value={item}>{item}</Tag>
      {/each}
    </TagGroup.List>
    <Description>Only one priority can be assigned to an issue.</Description>
  </TagGroup>

  <TagGroup selectionMode="multiple" bind:value={issueLabels}>
    <Label>Multiple Selection</Label>
    <TagGroup.List>
      {#each labels as item}
        <Tag value={item}>{item}</Tag>
      {/each}
    </TagGroup.List>
    <Description>Select as many labels as apply to categorize the issue.</Description>
  </TagGroup>
</div>
