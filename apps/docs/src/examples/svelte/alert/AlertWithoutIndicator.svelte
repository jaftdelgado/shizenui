<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-80">
  <Alert status="danger">
    <Alert.Content>
      <Alert.Title>Message not delivered</Alert.Title>
      <Alert.Description>Check your connection and try sending it again.</Alert.Description>
    </Alert.Content>
  </Alert>
</div>
