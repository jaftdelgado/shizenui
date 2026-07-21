<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  let backupContent = $state<string[]>(["files", "settings"]);

  const items = [
    {
      value: "files",
      label: "Files",
      description: "Back up uploaded files and documents."
    },
    {
      value: "settings",
      label: "Settings",
      description: "Save workspace preferences and configuration."
    },
    {
      value: "activity",
      label: "Activity History",
      description: "Store audit logs and recent changes."
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <CheckboxGroup bind:value={backupContent}>
    <Label>Backup Content</Label>
    <Description>Select what to include in your backup.</Description>

    <CheckboxGroup.Items>
      {#each items as item}
        <Checkbox value={item.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{item.label}</Label>
            <Description>{item.description}</Description>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <Description>
    Selected: {backupContent.length > 0 ? backupContent.join(", ") : "none"}
  </Description>
</div>
