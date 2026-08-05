<script lang="ts">
  import { Radio, RadioGroup, Surface, Label, Description } from "@shizen-ui/svelte";

  let selectedInstallments = $state("6");

  const options = [
    {
      value: "3",
      label: "3 months",
      description: "$133.00 per month, no interest."
    },
    {
      value: "6",
      label: "6 months",
      description: "$69.83 per month."
    },
    {
      value: "12",
      label: "12 months",
      description: "$34.89 per month."
    }
  ];
</script>

<div class="grid w-full max-w-80">
  <Surface>
    <RadioGroup bind:value={selectedInstallments} aria-label="Installment plan">
      <Label>Payment plan</Label>
      <Description>Choose how many months to split your payment.</Description>

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
