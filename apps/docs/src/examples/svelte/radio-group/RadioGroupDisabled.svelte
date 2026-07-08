<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let selected = $state("pro");

  const plans = [
    {
      value: "starter",
      label: "Starter Plan",
      description: "Basic features for individuals."
    },
    {
      value: "pro",
      label: "Professional Plan",
      description: "Advanced tools for growing teams."
    },
    {
      value: "enterprise",
      label: "Enterprise Plan",
      description: "Custom solutions for large scale."
    }
  ];
</script>

<div class="flex max-w-xs flex-col">
  <RadioGroup disabled bind:value={selected} name="subscription-plan">
    <Label>Subscription Plan</Label>
    <Description>Locked during billing process.</Description>

    <RadioGroup.Items>
      {#each plans as plan}
        <Radio value={plan.value}>
          <Radio.Control />
          <Radio.Content>
            <Label>{plan.label}</Label>
            <Description>{plan.description}</Description>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>
</div>
