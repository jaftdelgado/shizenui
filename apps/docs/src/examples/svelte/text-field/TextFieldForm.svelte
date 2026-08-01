<script lang="ts">
  import { Button, Description, FieldError, Input, Label, TextField } from "@shizen-ui/svelte";

  let inviteeEmail = $state("");

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    alert(`Invitation prepared for ${inviteeEmail}.`);
  }
</script>

<form class="flex w-full max-w-64 flex-col gap-6" onsubmit={handleSubmit}>
  <TextField bind:value={inviteeEmail} required>
    <Label>Teammate email</Label>
    <Input name="invitee-email" type="email" placeholder="teammate@company.com" />
    <Description>This person will be invited to your workspace.</Description>
    <FieldError>Enter a valid teammate email.</FieldError>
  </TextField>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Send invitation</Button>
  </div>
</form>
