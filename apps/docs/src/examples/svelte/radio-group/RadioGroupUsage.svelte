<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let selectedTheme = $state("light");

  const themes = [
    {
      value: "light",
      label: "Light Theme",
      description: "Clean and bright interface."
    },
    {
      value: "dark",
      label: "Dark Theme",
      description: "Low-light friendly interface."
    },
    {
      value: "system",
      label: "System Default",
      description: "Follow your operating system settings."
    }
  ];
</script>

<div class="flex-center justify-center">
  <RadioGroup bind:value={selectedTheme}>
    <Label>Appearance</Label>
    <Description>Choose your preferred theme.</Description>

    <RadioGroup.Items>
      {#each themes as theme}
        <Radio value={theme.value}>
          <Radio.Control />
          <Radio.Content>
            <Label>{theme.label}</Label>
            <Description>{theme.description}</Description>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>
</div>
