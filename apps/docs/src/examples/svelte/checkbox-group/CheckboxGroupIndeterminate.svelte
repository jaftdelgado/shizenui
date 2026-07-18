<script lang="ts">
  import { Checkbox, CheckboxGroup, Label } from "@shizen-ui/svelte";

  const assets = [
    { value: "images", label: "Images" },
    { value: "videos", label: "Videos" },
    { value: "audio", label: "Audio" }
  ];

  const allValues = assets.map((asset) => asset.value);

  let selected = $state<string[]>(["images", "videos"]);

  const isAllSelected = $derived(selected.length === allValues.length);
  const isIndeterminate = $derived(selected.length > 0 && selected.length < allValues.length);

  function handleSelectAllChange(checked: boolean): void {
    selected = checked ? [...allValues] : [];
  }
</script>

<div class="flex flex-col">
  <Checkbox
    checked={isAllSelected}
    indeterminate={isIndeterminate}
    onCheckedChange={handleSelectAllChange}
  >
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Select all resources</Label>
    </Checkbox.Content>
  </Checkbox>

  <div class="ml-6">
    <CheckboxGroup bind:value={selected} aria-label="Project assets">
      <CheckboxGroup.Items>
        {#each assets as asset}
          <Checkbox value={asset.value}>
            <Checkbox.Control />
            <Checkbox.Content>
              <Label>{asset.label}</Label>
            </Checkbox.Content>
          </Checkbox>
        {/each}
      </CheckboxGroup.Items>
    </CheckboxGroup>
  </div>
</div>
