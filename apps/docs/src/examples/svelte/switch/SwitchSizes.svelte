<script lang="ts">
  import { Switch, Label } from "@shizen-ui/svelte";
</script>

<div class="flex items-center gap-6">
  <Switch size="sm">
    <Switch.Control />
    <Switch.Content>
      <Label>Small</Label>
    </Switch.Content>
  </Switch>

  <Switch size="md">
    <Switch.Control />
    <Switch.Content>
      <Label>Medium</Label>
    </Switch.Content>
  </Switch>

  <Switch size="lg">
    <Switch.Control />
    <Switch.Content>
      <Label>Large</Label>
    </Switch.Content>
  </Switch>
</div>
