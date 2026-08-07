<script lang="ts">
  import { RadioGroup, Radio, Label, Description, FieldError, Button } from "@shizen-ui/svelte";

  let audioQuality = $state("");

  const qualityOptions = [
    { value: "normal", label: "Normal (96 kbps)" },
    { value: "high", label: "High (160 kbps)" },
    { value: "very_high", label: "Very high (320 kbps)" }
  ];

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    alert(`Playback settings saved!\n\nQuality: ${audioQuality || "None"}`);
  }
</script>

<form class="flex flex-col gap-6" onsubmit={handleSubmit}>
  <RadioGroup required bind:value={audioQuality} name="audio-quality">
    <Label>Streaming quality</Label>
    <Description>Higher quality uses more mobile data.</Description>
    <FieldError>Select a streaming quality.</FieldError>
    <RadioGroup.Items>
      {#each qualityOptions as option}
        <Radio value={option.value}>
          <Radio.Control />
          <Radio.Content>
            <Label>{option.label}</Label>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Save settings</Button>
  </div>
</form>
