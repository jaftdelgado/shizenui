<script lang="ts">
  import { Radio, RadioGroup, Label, Description } from "@shizen-ui/svelte";

  let defaultValue = $state("option-two");
  let secondaryValue = $state("option-two");

  const defaultOptions = [
    { value: "option-one", label: "Option 1", description: "Standard radio style." },
    { value: "option-two", label: "Option 2", description: "Another option with primary styling." }
  ];

  const secondaryOptions = [
    { value: "option-one", label: "Option 1", description: "Alternate, lower-emphasis style." },
    {
      value: "option-two",
      label: "Option 2",
      description: "Another option with secondary styling."
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <RadioGroup bind:value={defaultValue} aria-label="Default radio variant">
    <Label>Default</Label>
    <RadioGroup.Items>
      {#each defaultOptions as option}
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

  <RadioGroup variant="secondary" bind:value={secondaryValue} aria-label="Secondary radio variant">
    <Label>Secondary</Label>
    <RadioGroup.Items>
      {#each secondaryOptions as option}
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
</div>
