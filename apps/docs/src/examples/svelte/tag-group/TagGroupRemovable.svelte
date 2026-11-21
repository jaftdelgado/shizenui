<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { MinusSignIcon } from "@hugeicons/core-free-icons";

  let members = $state([
    { value: "emma", label: "Emma Clark" },
    { value: "noah", label: "Noah Davis" },
    { value: "olivia", label: "Olivia Smith" }
  ]);

  let labels = $state([
    { value: "design", label: "Design" },
    { value: "frontend", label: "Frontend" },
    { value: "research", label: "Research" }
  ]);

  function handleRemove(values: string[]) {
    members = members.filter((member) => !values.includes(member.value));
  }

  function handleRemoveLabel(values: string[]) {
    labels = labels.filter((label) => !values.includes(label.value));
  }
</script>

<div class="flex flex-col gap-6">
  <TagGroup onRemove={handleRemove}>
    <Label>Project members</Label>
    <TagGroup.List>
      {#each members as member (member.value)}
        <Tag value={member.value}>
          {member.label}
          <Tag.RemoveButton />
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>Removed members lose access to this project.</Description>
  </TagGroup>

  <TagGroup onRemove={handleRemoveLabel}>
    <Label>Issue labels</Label>
    <TagGroup.List>
      {#each labels as label (label.value)}
        <Tag value={label.value}>
          {label.label}
          <Tag.RemoveButton class="bg-neutral-800 text-white opacity-100 hover:bg-neutral-800">
            <Icon icon={MinusSignIcon} size={8} strokeWidth={6} />
          </Tag.RemoveButton>
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>Remove a label to take it off this issue.</Description>
  </TagGroup>
</div>
