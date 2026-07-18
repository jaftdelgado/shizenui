<script lang="ts">
  import { Checkbox, CheckboxGroup, Description, Label } from "@shizen-ui/svelte";

  let enabledChannels = $state<string[]>(["email", "push"]);

  const channels = [
    {
      value: "email",
      label: "Email"
    },
    {
      value: "push",
      label: "Push"
    },
    {
      value: "slack",
      label: "Slack"
    }
  ];
</script>

<div class="flex w-full max-w-xs flex-col">
  <CheckboxGroup bind:value={enabledChannels} class="rounded-3xl bg-neutral-50 p-5 shadow-xs">
    <Label>Notification Channels</Label>
    <Description>Choose how account activity should reach your team.</Description>

    <CheckboxGroup.Items class="mt-5 gap-3">
      {#each channels as channel (channel.value)}
        <Checkbox value={channel.value}>
          <Checkbox.Control
            class="bg-control rounded-full data-checked:bg-neutral-800 data-checked:hover:bg-neutral-700"
          />
          <Checkbox.Content>
            <Label>{channel.label}</Label>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>
</div>
