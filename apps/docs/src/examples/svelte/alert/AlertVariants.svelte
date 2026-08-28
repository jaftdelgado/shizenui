<!-- AlertVariants.svelte -->
<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-xs flex-col gap-4">
  <Alert variant="default">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Default Alert</Alert.Title>
      <Alert.Description>
        Uses the standard background with a subtle elevation shadow.
      </Alert.Description>
    </Alert.Content>
  </Alert>
  <Alert variant="secondary">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Secondary Alert</Alert.Title>
      <Alert.Description>Uses a muted background to reduce visual emphasis.</Alert.Description>
    </Alert.Content>
  </Alert>
  <Alert variant="outline">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Outline Alert</Alert.Title>
      <Alert.Description>
        Uses a bordered, transparent background instead of a fill.
      </Alert.Description>
    </Alert.Content>
  </Alert>
</div>
