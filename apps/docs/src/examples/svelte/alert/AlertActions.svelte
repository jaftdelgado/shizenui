<script lang="ts">
  import { Alert, Button, Checkbox, Label } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-xs">
  <Alert status="warning">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Two-factor authentication is disabled</Alert.Title>
      <Alert.Description>
        Protect your account by enabling an additional sign-in step.
      </Alert.Description>
    </Alert.Content>
    <Alert.Actions class="mt-2 flex flex-row justify-end gap-4">
      <Checkbox class="gap-2">
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>Don't remind me</Label>
        </Checkbox.Content>
      </Checkbox>
      <Button size="sm">Enable 2FA</Button>
    </Alert.Actions>
  </Alert>
</div>
