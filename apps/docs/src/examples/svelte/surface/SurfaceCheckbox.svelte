<script lang="ts">
  import { Surface, Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  let selectedSettings = $state<string[]>(["format-on-save"]);

  const settings = [
    { id: "format-on-save", name: "Format on save", info: "Auto-format files when saved." },
    { id: "word-wrap", name: "Word wrap", info: "Wrap long lines in the editor." },
    { id: "auto-imports", name: "Auto imports", info: "Add missing imports automatically." }
  ];
</script>

<div class="flex w-full max-w-80 flex-col gap-6">
  <Surface>
    <CheckboxGroup bind:value={selectedSettings}>
      <Label>Editor Settings</Label>
      <Description>Customize your coding experience.</Description>

      <CheckboxGroup.Items>
        {#each settings as setting}
          <Checkbox value={setting.id}>
            <Checkbox.Control />
            <Checkbox.Content>
              <Label>{setting.name}</Label>
              <Description>{setting.info}</Description>
            </Checkbox.Content>
          </Checkbox>
        {/each}
      </CheckboxGroup.Items>
    </CheckboxGroup>
  </Surface>
</div>
