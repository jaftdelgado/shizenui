<script>
  import { Switch, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <Switch>
    <Switch.Control />
    <Switch.Content>
      <Label>Label after</Label>
    </Switch.Content>
  </Switch>

  <Switch>
    <Switch.Content>
      <Label>Label before</Label>
    </Switch.Content>
    <Switch.Control />
  </Switch>
</div>
