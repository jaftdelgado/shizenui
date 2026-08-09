<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";
</script>

<SwitchGroup value={["email"]}>
  <Label>Group Label</Label>
  <Description>Group description text</Description>

  <SwitchGroup.Items>
    <Switch value="email">
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
