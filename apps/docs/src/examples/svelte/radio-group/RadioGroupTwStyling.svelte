<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let audience = $state("followers");

  const options = [
    {
      value: "public",
      label: "Public",
      description: "Anyone on the platform can see this post."
    },
    {
      value: "followers",
      label: "Followers only",
      description: "Only people who follow you can see this post."
    },
    {
      value: "private",
      label: "Only me",
      description: "This post will only be visible to you."
    }
  ];
</script>

<RadioGroup bind:value={audience}>
  <Label>Who can see this post?</Label>
  <Description>Choose the audience for this post before publishing.</Description>

  <RadioGroup.Items>
    {#each options as option}
      <Radio value={option.value}>
        <Radio.Control
          class="border-2 border-current bg-transparent text-neutral-300 data-checked:bg-transparent data-checked:text-violet-500"
        >
          <Radio.Indicator class="scale-0 bg-violet-500 duration-150 data-checked:scale-[0.6]" />
        </Radio.Control>
        <Radio.Content>
          <Label>{option.label}</Label>
          <Description>{option.description}</Description>
        </Radio.Content>
      </Radio>
    {/each}
  </RadioGroup.Items>
</RadioGroup>
