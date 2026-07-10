<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let notification = $state("all");

  const options = [
    {
      value: "all",
      label: "All notifications",
      description: "Get notified for every activity."
    },
    {
      value: "mentions",
      label: "Mentions only",
      description: "Only when someone tags you."
    },
    {
      value: "none",
      label: "Nothing",
      description: "Turn off all notifications."
    }
  ];
</script>

<div class="flex max-w-sm flex-col">
  <RadioGroup bind:value={notification} name="notification-preference">
    <Label>Notifications</Label>
    <Description>Choose what activity you want to be notified about.</Description>

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
</div>
