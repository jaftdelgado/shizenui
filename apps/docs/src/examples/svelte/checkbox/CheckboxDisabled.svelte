<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <Checkbox disabled={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Marketing emails</Label>
      <Description>Requires a verified email address.</Description>
    </Checkbox.Content>
  </Checkbox>

  <Checkbox disabled={true} checked={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Two-factor authentication</Label>
      <Description>Enforced by your organization.</Description>
    </Checkbox.Content>
  </Checkbox>
</div>
