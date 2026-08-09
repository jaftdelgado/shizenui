<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  const notifications = [
    { id: "email", label: "Email", description: "Receive updates via email." },
    { id: "sms", label: "SMS", description: "Get alerts as text messages." },
    { id: "push", label: "Push", description: "Enable browser notifications." }
  ];

  let enabledChannels = $state(["sms", "push"]);

  const activeChannels = $derived(enabledChannels.join(", ") || "None");
</script>

<div class="flex flex-col gap-6">
  <SwitchGroup bind:value={enabledChannels}>
    <Label>Notification Channels</Label>
    <Description>Choose how you want to be notified.</Description>

    <SwitchGroup.Items>
      {#each notifications as channel}
        <Switch value={channel.id}>
          <Switch.Control />
          <Switch.Content>
            <Label>{channel.label}</Label>
            <Description>{channel.description}</Description>
          </Switch.Content>
        </Switch>
      {/each}
    </SwitchGroup.Items>
  </SwitchGroup>

  <Description>Active channels: {activeChannels}</Description>
</div>
