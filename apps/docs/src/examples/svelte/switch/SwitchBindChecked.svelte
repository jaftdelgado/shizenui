<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";

  let isAirplaneMode = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Switch bind:checked={isAirplaneMode}>
    <Switch.Control />
    <Switch.Content>
      <Label>Airplane Mode</Label>
    </Switch.Content>
  </Switch>

  <Description>
    Switch state: {isAirplaneMode ? "on" : "off"}
  </Description>
</div>
