<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let email = $state("");
</script>

<div class="flex w-full max-w-64">
  <TextField required bind:value={email}>
    <Label>Email Address</Label>
    <Input placeholder="Enter your email address" />
    <Description>We'll send the invoice confirmation here</Description>
  </TextField>
</div>
