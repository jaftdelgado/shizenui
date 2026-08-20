<script lang="ts">
  import { TextArea, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="reply-message">Post your reply</Label>
  <TextArea
    id="reply-message"
    disabled
    rows={3}
    placeholder="Replies are limited to accounts the author follows."
    aria-describedby="reply-message-description"
  />
  <Description id="reply-message-description">
    The author has restricted who can reply to this post.
  </Description>
</div>
