<script lang="ts">
  import { TextField, TextArea, Label, Description } from "@shizen-ui/svelte";

  let commitDescription = $state("");
</script>

<div class="grid w-full max-w-80">
  <TextField bind:value={commitDescription}>
    <Label>Extended description</Label>
    <TextArea rows={4} placeholder="Explain what changed and why..." />
    <Description>Optional. Provide more context for this commit.</Description>
  </TextField>
</div>
