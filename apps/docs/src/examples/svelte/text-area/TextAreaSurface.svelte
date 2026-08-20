<script lang="ts">
  import { TextArea, Surface, Label } from "@shizen-ui/svelte";

  let autoReplyMessage = $state(
    "Thanks for your email! I'm currently out of office and will respond when I'm back."
  );
</script>

<div class="grid w-full max-w-80">
  <Surface class="flex flex-col gap-2 p-4">
    <Label for="auto-reply-message">Automatic reply message</Label>
    <TextArea
      id="auto-reply-message"
      bind:value={autoReplyMessage}
      rows={4}
      aria-describedby="auto-reply-message-description"
    />
  </Surface>
</div>
