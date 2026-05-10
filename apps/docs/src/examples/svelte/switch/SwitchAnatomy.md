<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";
</script>

<SwitchGroup>
  <Label>Group Label</Label>
  <Description>Group description text</Description>

  <SwitchGroup.Items>
    <Switch>
      <Switch.Control>
        <!-- Optional -->
        <Switch.Thumb />
      </Switch.Control>

      <Switch.Content>
        <Label>Switch Label</Label>
        <Description>Switch description text</Description>
      </Switch.Content>
    </Switch>
  </SwitchGroup.Items>
</SwitchGroup>
