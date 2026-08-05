<script lang="ts">
  import { Surface, RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let selectedTimeout = $state("5");

  const options = [
    {
      value: "1",
      label: "1 minute",
      description: "Locks quickly after inactivity."
    },
    {
      value: "5",
      label: "5 minutes",
      description: "Balanced security and convenience."
    },
    {
      value: "15",
      label: "15 minutes",
      description: "Stays unlocked longer."
    }
  ];
</script>

<div class="flex w-full max-w-80 flex-col gap-6">
  <Surface>
    <RadioGroup bind:value={selectedTimeout} aria-label="Auto-lock timeout">
      <Label>Auto-lock vault</Label>
      <Description>Lock the vault after a period of inactivity.</Description>

      <RadioGroup.Items>
        {#each options as option}
          <Radio value={option.value}>
            <Radio.Control />
            <Radio.Content>
              <Label>{option.label}</Label>
              <Description>{option.description}</Description>
            </Radio.Content>
          </Radio>
        {/each}
      </RadioGroup.Items>
    </RadioGroup>
  </Surface>
</div>
