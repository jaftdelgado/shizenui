<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  let connectedTools = $state<string[]>(["notion", "airtable"]);

  const tools = [
    { value: "notion", label: "Notion", description: "Organize notes and project knowledge." },
    { value: "airtable", label: "Airtable", description: "Manage structured team data." },
    { value: "miro", label: "Miro", description: "Collaborate on visual boards." }
  ];
</script>

<div class="flex flex-col gap-6">
  <SwitchGroup bind:value={connectedTools}>
    <Label>Connected tools</Label>
    <Description>Choose the tools connected to this workspace.</Description>

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

  <Description>
    Connected: {connectedTools.length > 0 ? connectedTools.join(", ") : "None"}
  </Description>
</div>
