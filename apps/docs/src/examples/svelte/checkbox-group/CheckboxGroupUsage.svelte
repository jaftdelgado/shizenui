<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  let selectedIntegrations = $state<string[]>(["github", "jira"]);

  const integrations = [
    { id: "slack", name: "Slack", info: "Sync messages and alerts." },
    { id: "github", name: "GitHub", info: "Connect repositories and PRs." },
    { id: "jira", name: "Jira", info: "Track issues and projects." }
  ];
</script>

<div class="flex flex-col">
  <CheckboxGroup bind:value={selectedIntegrations}>
    <Label>App Integrations</Label>
    <Description>Connect your workflow tools.</Description>

    <CheckboxGroup.Items>
      {#each integrations as app}
        <Checkbox value={app.id}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{app.name}</Label>
            <Description>{app.info}</Description>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>
</div>
