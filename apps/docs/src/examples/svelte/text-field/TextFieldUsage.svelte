<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let email = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField bind:value={email} required>
    <Label>Email</Label>
    <Input placeholder="Enter your email" />
    <Description>This is a description for the email field.</Description>
  </TextField>
</div>
