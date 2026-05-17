<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  const features = [
    { id: "analytics", label: "Analytics", description: "Track usage and events." },
    { id: "exports", label: "Data Exports", description: "Download reports as CSV." },
    { id: "api", label: "API Access", description: "Connect via REST API." }
  ];
</script>

<div class="flex flex-col">
  <SwitchGroup disabled={true}>
    <Label>Plan Features</Label>
    <Description>Upgrade your plan to manage these settings.</Description>

    <SwitchGroup.Items>
      {#each features as feature}
        <Switch>
          <Switch.Control />
          <Switch.Content>
            <Label>{feature.label}</Label>
            <Description>{feature.description}</Description>
          </Switch.Content>
        </Switch>
      {/each}
    </SwitchGroup.Items>
  </SwitchGroup>
</div>
