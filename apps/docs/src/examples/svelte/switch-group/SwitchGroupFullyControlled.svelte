<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  let monitoringTools = $state<string[]>(["sentry"]);

  const tools = [
    { value: "datadog", label: "Datadog", description: "Monitor application performance." },
    { value: "sentry", label: "Sentry", description: "Track errors and crashes." },
    { value: "newrelic", label: "New Relic", description: "Track infrastructure and uptime." }
  ];

  function getValue(): string[] {
    return monitoringTools;
  }

  function setValue(nextValue: string[]): void {
    if (nextValue.length === 0) {
      if (!confirm("This will leave your app with no monitoring enabled. Continue?")) {
        return;
      }
    }
    monitoringTools = nextValue;
  }
</script>

<SwitchGroup bind:value={getValue, setValue}>
  <Label>Monitoring tools</Label>
  <Description>Choose the services used to monitor this app.</Description>
  <SwitchGroup.Items>
    {#each tools as tool}
      <Switch value={tool.value}>
        <Switch.Control />
        <Switch.Content>
          <Label>{tool.label}</Label>
          <Description>{tool.description}</Description>
        </Switch.Content>
      </Switch>
    {/each}
  </SwitchGroup.Items>
</SwitchGroup>
