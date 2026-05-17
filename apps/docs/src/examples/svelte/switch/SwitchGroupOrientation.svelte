<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  const permissions = [
    { id: "read", label: "Read" },
    { id: "write", label: "Write" },
    { id: "delete", label: "Delete" }
  ];
</script>

<div class="flex flex-col">
  <SwitchGroup orientation="horizontal">
    <Label>Access Permissions</Label>
    <Description>Set what this role can do.</Description>

    <SwitchGroup.Items>
      {#each permissions as permission}
        <Switch>
          <Switch.Control />
          <Switch.Content>
            <Label>{permission.label}</Label>
          </Switch.Content>
        </Switch>
      {/each}
    </SwitchGroup.Items>
  </SwitchGroup>
</div>
