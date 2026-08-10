<script lang="ts">
  import { SwitchGroup, Switch, Label, Description, FieldError } from "@shizen-ui/svelte";
</script>

<SwitchGroup>
  <Label />
  <Description />
  <FieldError />
  <SwitchGroup.Items>
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
  </SwitchGroup.Items>
</SwitchGroup>
