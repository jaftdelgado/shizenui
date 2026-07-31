<script lang="ts">
  import { Button, Description, FieldError, Input, Label, TextField } from "@shizen-ui/svelte";

  let inviteeEmail = $state("");
  let submittedEmail = $state<string | null>(null);

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    submittedEmail = inviteeEmail;
  }
</script>

<form class="flex w-full max-w-80 flex-col gap-4" onsubmit={handleSubmit}>
  <TextField bind:value={inviteeEmail} required>
    <Label>Teammate email</Label>
    <Input name="invitee-email" type="email" placeholder="teammate@company.com" />
    <Description>We'll send this person an invitation to your analytics workspace.</Description>
    <FieldError>Enter a valid teammate email address to send an invitation.</FieldError>
  </TextField>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Send invitation</Button>
  </div>

  {#if submittedEmail}
    <p class="text-success text-xs">Invitation prepared for {submittedEmail}.</p>
  {/if}
</form>
