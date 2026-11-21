<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

  let selectedDays = $state<string[]>(["monday", "wednesday", "friday"]);

  const summary = $derived(
    selectedDays.length === days.length
      ? "Every day"
      : selectedDays.length > 0
        ? days
            .filter((day) => selectedDays.includes(day.value))
            .map((day) => day.label)
            .join(", ")
        : "none"
  );
</script>

<div class="flex w-full max-w-xs flex-col gap-6">
  <TagGroup selectionMode="multiple" bind:value={selectedDays}>
    <Label>Repeat reminder on</Label>
    <TagGroup.List>
      {#each days as day (day.value)}
        <Tag value={day.value}>{day.label}</Tag>
      {/each}
    </TagGroup.List>
  </TagGroup>

  <Description>Selected tags: {summary}</Description>
</div>
