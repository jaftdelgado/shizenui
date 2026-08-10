<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";
</script>

<Switch>
  <Switch.Control>
    <!-- Optional -->
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Content>
    <Label />
    <Description />
  </Switch.Content>
</Switch>
