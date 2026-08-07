<script lang="ts">
  import { RadioGroup, Radio, Label, Description, FieldError, Button } from "@shizen-ui/svelte";

  let selected = $state("");
  let isSubmitted = $state(true);

  const visibilityOptions = [
    {
      value: "public",
      label: "Public",
      description: "Visible to everyone on the platform."
    },
    {
      value: "private",
      label: "Private",
      description: "Only people you approve can see your profile."
    },
    {
      value: "hidden",
      label: "Hidden",
      description: "You won't appear in search results."
    }
  ];

  let isInvalid = $derived(isSubmitted && selected === "");

  function handleSubmit() {
    isSubmitted = true;
  }

  function handleClear() {
    selected = "";
    isSubmitted = false;
  }
</script>

<div class="flex flex-col gap-6">
  <RadioGroup bind:value={selected} invalid={isInvalid} required={true}>
    <Label>Profile Visibility</Label>
    <Description>Choose how others see your profile information.</Description>
    <FieldError>This field is required. Please select an option.</FieldError>
    <RadioGroup.Items>
      {#each visibilityOptions as option}
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

  <div class="flex gap-2">
    <Button variant="outline" size="sm" onclick={handleClear}>Clear</Button>
    <Button variant="primary" size="sm" onclick={handleSubmit}>Save Changes</Button>
  </div>
</div>
