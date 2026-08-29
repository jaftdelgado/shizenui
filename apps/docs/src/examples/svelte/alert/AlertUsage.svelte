<script lang="ts">
  import { Alert, Button } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-xs">
  <Alert status="accent">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>A new update is available</Alert.Title>
      <Alert.Description>
        Version 2.4 includes performance improvements and bug fixes.
      </Alert.Description>
    </Alert.Content>
    <Alert.Actions class="mt-2 flex flex-row justify-end gap-2">
      <Button variant="outline" size="sm">Later</Button>
      <Button size="sm">Update now</Button>
    </Alert.Actions>
  </Alert>
</div>
