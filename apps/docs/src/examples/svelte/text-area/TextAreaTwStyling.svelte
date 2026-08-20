<script lang="ts">
  import { TextArea, Label, Description } from "@shizen-ui/svelte";

  let bio = $state("");
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="bio-textarea">Bio & interests</Label>
  <TextArea
    id="bio-textarea"
    bind:value={bio}
    rows={3}
    placeholder="Tell us a little about yourself..."
    class="bg-control resize-none rounded-t-md rounded-b-none border-b-2 border-neutral-400 shadow-none focus:border-indigo-600 focus:ring-0"
    aria-describedby="bio-textarea-description"
  />
  <Description id="bio-textarea-description">
    Shown on your public profile, along with your name and photo.
  </Description>
</div>
