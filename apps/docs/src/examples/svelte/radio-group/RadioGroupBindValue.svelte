<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let quality = $state("auto");

  const qualities = [
    {
      value: "auto",
      label: "Auto",
      description: "Adjusts based on your connection."
    },
    {
      value: "hd",
      label: "HD 1080p",
      description: "Sharper video, higher data usage."
    },
    {
      value: "sd",
      label: "SD 480p",
      description: "Lower data usage, faster loading."
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <RadioGroup bind:value={quality} name="video-quality">
    <Label>Video Quality</Label>
    <Description>Choose the streaming resolution for playback.</Description>

    <RadioGroup.Items>
      {#each qualities as option}
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

  <Description>Current quality: {quality}</Description>
</div>
