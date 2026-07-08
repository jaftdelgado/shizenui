<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let selected = $state("daily");

  const frequencies = [
    {
      value: "realtime",
      label: "Real-time",
      description: "Immediate alerts."
    },
    {
      value: "daily",
      label: "Daily",
      description: "Once per day."
    },
    {
      value: "weekly",
      label: "Weekly",
      description: "Sunday digest."
    }
  ];
</script>

<div class="flex w-full flex-col items-center">
  <RadioGroup orientation="horizontal" bind:value={selected} name="email-frequency">
    <Label>Email Frequency</Label>
    <Description>How often should we send you updates?</Description>

    <RadioGroup.Items>
      {#each frequencies as freq}
        <Radio value={freq.value}>
          <Radio.Control />
          <Radio.Content>
            <Label>{freq.label}</Label>
            <Description>{freq.description}</Description>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>
</div>
