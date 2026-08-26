<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
  <Alert variant="default">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Default variant</Alert.Title>
      <Alert.Description>
        This uses the standard surface style for in-page notifications.
      </Alert.Description>
    </Alert.Content>
  </Alert>

  <Alert variant="secondary">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Secondary variant</Alert.Title>
      <Alert.Description>
        Use this inside cards and side panels for softer contrast.
      </Alert.Description>
    </Alert.Content>
  </Alert>

  <Alert variant="outline">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Secondary variant</Alert.Title>
      <Alert.Description>
        Use this inside cards and side panels for softer contrast.
      </Alert.Description>
    </Alert.Content>
  </Alert>
</div>
