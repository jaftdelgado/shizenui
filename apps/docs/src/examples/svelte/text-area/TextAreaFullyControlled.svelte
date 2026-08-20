<script lang="ts">
  import { TextArea, Label, Description } from "@shizen-ui/svelte";

  let feedbackMessage = $state("");

  function getValue() {
    return feedbackMessage;
  }

  function setValue(newValue: string) {
    if (newValue.length === 0 && feedbackMessage.length > 20) {
      const confirmed = confirm("Discard your feedback? This can't be undone.");
      if (!confirmed) return;
    }

    feedbackMessage = newValue;
  }
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="feedback-message">Feedback</Label>
  <TextArea
    id="feedback-message"
    bind:value={getValue, setValue}
    rows={3}
    placeholder="Tell us what you think..."
    aria-describedby="feedback-message-description"
  />
  <Description id="feedback-message-description">
    Help us improve by sharing your thoughts.
  </Description>
</div>
