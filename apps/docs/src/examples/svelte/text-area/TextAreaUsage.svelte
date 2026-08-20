<script lang="ts">
  import { TextArea, Label, Description } from "@shizen-ui/svelte";

  let commentText = $state("");
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="comment-text">Add a comment</Label>
  <TextArea
    id="comment-text"
    bind:value={commentText}
    rows={3}
    placeholder="What are your thoughts?"
    aria-describedby="comment-text-description"
  />
  <Description id="comment-text-description">
    Comments are public and visible to everyone.
  </Description>
</div>
