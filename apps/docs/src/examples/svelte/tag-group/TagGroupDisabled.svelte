<script lang="ts">
  import { Tag, TagGroup, Label } from "@shizen-ui/svelte";

  const options = ["Email", "SMS", "Push", "Slack"];
</script>

<div class="flex flex-col gap-6">
  <TagGroup selectionMode="multiple" disabled>
    <Label>Disabled group</Label>
    <TagGroup.List>
      {#each options as option}
        <Tag value={option}>{option}</Tag>
      {/each}
    </TagGroup.List>
  </TagGroup>

  <TagGroup selectionMode="multiple">
    <Label>Disabled tag</Label>
    <TagGroup.List>
      {#each options as option}
        <Tag value={option} disabled={option === "SMS"}>{option}</Tag>
      {/each}
    </TagGroup.List>
  </TagGroup>
</div>
