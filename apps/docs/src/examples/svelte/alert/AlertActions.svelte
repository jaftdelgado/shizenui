<script lang="ts">
  import { Alert, Button, Checkbox, Label } from "@shizen-ui/svelte";
</script>

<Alert status="warning" class="w-full max-w-2xl">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Two-factor authentication is disabled</Alert.Title>
    <Alert.Description
      >Protect your Bitwarden vault by enabling an additional sign-in step.</Alert.Description
    >
  </Alert.Content>
  <Alert.Actions>
    <Checkbox>
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Don't remind me</Label>
      </Checkbox.Content>
    </Checkbox>
    <Button size="sm" variant="outline">Enable 2FA</Button>
  </Alert.Actions>
</Alert>
