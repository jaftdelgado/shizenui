<script lang="ts">
  import {
    Checkbox,
    CheckboxGroup,
    Label,
    Description,
    FieldError,
    Button
  } from "@shizen-ui/svelte";

  let selectedAlerts = $state<string[]>([]);
  let isSubmitted = $state(false);

  const alertChannels = [
    {
      value: "deployments",
      label: "Deployment Failures",
      description: "Alerts for failed production deployments."
    },
    {
      value: "billing",
      label: "Billing Issues",
      description: "Notices for failed payments and overdue invoices."
    },
    {
      value: "security",
      label: "Security Events",
      description: "Alerts for suspicious sign-ins and policy updates."
    }
  ];

  let isInvalid = $derived(isSubmitted && selectedAlerts.length === 0);

  function handleSubmit() {
    isSubmitted = true;
    alert(`Selected alert channels: ${selectedAlerts.join(", ")}`);
  }

  function handleClear() {
    selectedAlerts = [];
    isSubmitted = false;
  }
</script>

<div class="flex max-w-md flex-col gap-6 p-4">
  <CheckboxGroup required invalid={isInvalid} bind:value={selectedAlerts}>
    <Label>Admin Alerts</Label>
    <Description>Select at least one alert channel.</Description>
    <FieldError>Select one or more alert channels.</FieldError>
    <CheckboxGroup.Items>
      {#each alertChannels as channel}
        <Checkbox value={channel.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{channel.label}</Label>
            <Description>{channel.description}</Description>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <div class="flex gap-3">
    <Button variant="outline" size="sm" onclick={handleClear}>Clear</Button>
    <Button variant="primary" size="sm" onclick={handleSubmit}>Save Alerts</Button>
  </div>
</div>
