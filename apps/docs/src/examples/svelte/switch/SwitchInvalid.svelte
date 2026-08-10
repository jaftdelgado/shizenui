<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <Switch invalid>
    <Switch.Control />
    <Switch.Content>
      <Label>Remember device</Label>
      <Description>This setting is unavailable until MFA is fixed</Description>
    </Switch.Content>
  </Switch>

  <Switch checked={true} invalid>
    <Switch.Control />
    <Switch.Content>
      <Label>Require MFA</Label>
      <Description>Your MFA provider could not be verified</Description>
    </Switch.Content>
  </Switch>
</div>
