<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let city = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField bind:value={city}>
    <Label>City</Label>
    <Input placeholder="San Francisco" />
    <Description>Used to show local pricing</Description>
  </TextField>
</div>
