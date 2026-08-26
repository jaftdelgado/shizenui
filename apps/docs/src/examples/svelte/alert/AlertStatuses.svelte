<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
  <Alert status="default">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>General information</Alert.Title>
      <Alert.Description>Your profile changes are saved automatically.</Alert.Description>
    </Alert.Content>
  </Alert>

  <Alert status="accent">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Product update</Alert.Title>
      <Alert.Description>New keyboard shortcuts are now available in the editor.</Alert.Description>
    </Alert.Content>
  </Alert>

  <Alert status="success">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Deployment completed</Alert.Title>
      <Alert.Description>Version 2.4.1 was deployed successfully to production.</Alert.Description>
    </Alert.Content>
  </Alert>

  <Alert status="warning">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Storage almost full</Alert.Title>
      <Alert.Description>You are using 92% of your workspace storage quota.</Alert.Description>
    </Alert.Content>
  </Alert>

  <Alert status="danger">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Payment failed</Alert.Title>
      <Alert.Description
        >We could not process your invoice. Update your billing method.
      </Alert.Description>
    </Alert.Content>
  </Alert>
</div>
