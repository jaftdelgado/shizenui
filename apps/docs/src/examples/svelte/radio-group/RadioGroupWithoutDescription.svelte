<script lang="ts">
  import { RadioGroup, Radio, Label } from "@shizen-ui/svelte";

  let selectedFrequency = "immediately";

  const frequencies = [
    { value: "immediately", label: "Immediately" },
    { value: "daily", label: "Daily digest" },
    { value: "weekly", label: "Weekly summary" },
    { value: "never", label: "Never" }
  ];
</script>

<div class="flex-center justify-center">
  <RadioGroup readonly bind:value={selectedFrequency} name="notification-frequency">
    <Label>Notification Frequency</Label>

    <RadioGroup.Items>
      {#each frequencies as freq}
        <Radio value={freq.value}>
          <Radio.Control />
          <Radio.Content>
            <Label>{freq.label}</Label>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>
</div>
