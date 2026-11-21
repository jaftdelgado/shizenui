<script lang="ts">
  import { Tag, TagGroup, Label, Description, FieldError, Button } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import {
    Restaurant01Icon,
    Airplane01Icon,
    Dumbbell01Icon,
    MusicNote01Icon,
    Book01Icon,
    GameController01Icon
  } from "@hugeicons/core-free-icons";

  const MAX_INTERESTS = 3;

  const interests = [
    { value: "cooking", label: "Cooking", icon: Restaurant01Icon },
    { value: "travel", label: "Travel", icon: Airplane01Icon },
    { value: "fitness", label: "Fitness", icon: Dumbbell01Icon },
    { value: "music", label: "Music", icon: MusicNote01Icon },
    { value: "reading", label: "Reading", icon: Book01Icon },
    { value: "gaming", label: "Gaming", icon: GameController01Icon }
  ];

  let selectedInterests = $state<string[]>(["cooking", "travel", "music", "gaming"]);

  let isInvalid = $derived(selectedInterests.length > MAX_INTERESTS);

  function handleSave() {
    if (isInvalid) return;
    alert(`Saved interests: ${selectedInterests.join(", ")}`);
  }

  function handleClear() {
    selectedInterests = [];
  }
</script>

<div class="flex w-full max-w-xs flex-col gap-6">
  <TagGroup selectionMode="multiple" invalid={isInvalid} bind:value={selectedInterests}>
    <Label>Choose your interests</Label>
    <TagGroup.List>
      {#each interests as interest (interest.value)}
        <Tag value={interest.value}>
          {#snippet startContent()}
            <Icon icon={interest.icon} size={14} />
          {/snippet}
          {interest.label}
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>Choose up to {MAX_INTERESTS} for a feed that fits you.</Description>
    <FieldError>
      That's {selectedInterests.length - MAX_INTERESTS} too many. Remove {selectedInterests.length -
        MAX_INTERESTS} to save.
    </FieldError>
  </TagGroup>

  <div class="flex gap-3">
    <Button variant="outline" size="sm" onclick={handleClear}>Clear</Button>
    <Button variant="primary" size="sm" onclick={handleSave}>Save interests</Button>
  </div>
</div>
