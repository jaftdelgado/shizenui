<script lang="ts">
  import { Checkbox, Label, FieldError } from "@shizen-ui/svelte";

  let acceptTerms = $state(false);
  let isUnder13 = $state(true);
</script>

<div class="flex flex-col gap-4">
  <Checkbox bind:checked={acceptTerms} invalid={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>I agree to the Terms of Service</Label>
      <FieldError>You must accept the terms to continue.</FieldError>
    </Checkbox.Content>
  </Checkbox>

  <Checkbox bind:checked={isUnder13} invalid={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>I am under 13 years old</Label>
      <FieldError>You must be at least 13 to create an account.</FieldError>
    </Checkbox.Content>
  </Checkbox>
</div>
