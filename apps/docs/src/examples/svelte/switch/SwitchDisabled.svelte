<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <Switch disabled={true}>
    <Switch.Control />
    <Switch.Content>
      <Label>Developer Mode</Label>
      <Description>Locked by administrator.</Description>
    </Switch.Content>
  </Switch>

  <Switch disabled={true} checked={true}>
    <Switch.Control />
    <Switch.Content>
      <Label>Two-Factor Authentication</Label>
      <Description>Required by security policy.</Description>
    </Switch.Content>
  </Switch>
</div>
