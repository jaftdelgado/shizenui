<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";

  let maintenanceMode = $state(false);

  function getValue() {
    return maintenanceMode;
  }

  function setValue(newValue: boolean) {
    if (newValue && !confirm("This will take your app offline for all users. Continue?")) {
      return;
    }
    maintenanceMode = newValue;
  }
</script>

<Switch bind:checked={getValue, setValue}>
  <Switch.Control />
  <Switch.Content>
    <Label>Maintenance mode</Label>
    <Description>This will take your app offline for all users</Description>
  </Switch.Content>
</Switch>
