<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  let rememberMe = $state(false);
</script>

<div class="flex flex-col gap-6">
  <Checkbox bind:checked={rememberMe}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Remember me</Label>
      <Description>Stay signed in on this device.</Description>
    </Checkbox.Content>
  </Checkbox>

  <Description>Checkbox state: {rememberMe ? "on" : "off"}</Description>
</div>
