<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <Switch>
    <Switch.Control />
    <Switch.Content>
      <Label>Weekly digest</Label>
      <Description>A Monday summary of all workspace activity.</Description>
    </Switch.Content>
  </Switch>

  <Switch checked={true}>
    <Switch.Control />
    <Switch.Content>
      <Label>Mentions & comments</Label>
      <Description>Get notified when someone mentions you or replies.</Description>
    </Switch.Content>
  </Switch>
</div>
