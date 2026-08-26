<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { CloudUploadIcon } from "@hugeicons/core-free-icons";
</script>

<div class="grid max-w-xs">
  <Alert status="success">
    <Alert.Indicator>
      {#snippet children()}
        <Icon icon={CloudUploadIcon} />
      {/snippet}
    </Alert.Indicator>
    <Alert.Content>
      <Alert.Title>Backup complete</Alert.Title>
      <Alert.Description>All your chats are saved and up to date.</Alert.Description>
    </Alert.Content>
  </Alert>
</div>
