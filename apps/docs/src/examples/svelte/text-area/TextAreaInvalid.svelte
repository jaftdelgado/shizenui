<script lang="ts">
  import { TextArea, Label, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="review-text">Write your review</Label>
  <TextArea
    id="review-text"
    invalid
    rows={3}
    placeholder="What did you think of this product?"
    aria-describedby="review-text-description"
  />
  <FieldError id="review-text-description">Please write a review before submitting.</FieldError>
</div>
