<script lang="ts">
  import { Switch, SwitchGroup, Label, Description, FieldError } from "@shizen-ui/svelte";

  let notifyMe = $state<string[]>([""]);

  const notifications = [
    {
      value: "matches",
      label: "New matches",
      description: "Get notified when someone likes you back."
    },
    { value: "messages", label: "Messages", description: "Get notified about new messages." },
    {
      value: "superlikes",
      label: "Super likes",
      description: "Get notified when someone super likes you."
    }
  ];
</script>

<SwitchGroup bind:value={notifyMe} required invalid>
  <Label>Push notifications</Label>
  <FieldError>Select at least one notification type to stay updated</FieldError>
  <SwitchGroup.Items>
    {#each notifications as notification}
      <Switch value={notification.value}>
        <Switch.Control />
        <Switch.Content>
          <Label>{notification.label}</Label>
          <Description>{notification.description}</Description>
        </Switch.Content>
      </Switch>
    {/each}
  </SwitchGroup.Items>
</SwitchGroup>
