<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  const permissions = [
    { id: "read", label: "Read" },
    { id: "write", label: "Write" },
    { id: "delete", label: "Delete" }
  ];
</script>

<SwitchGroup orientation="horizontal" value={["read"]}>
  <Label>Access Permissions</Label>
  <Description>Set what this role can do.</Description>

  <SwitchGroup.Items>
    {#each permissions as permission}
      <Switch value={permission.id}>
        <Switch.Control />
        <Switch.Content>
          <Label>{permission.label}</Label>
        </Switch.Content>
      </Switch>
    {/each}
  </SwitchGroup.Items>
</SwitchGroup>
