<script lang="ts">
  import { TextField, Input, Label } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-64 flex-col gap-4">
  <TextField size="sm">
    <Label>Small</Label>
    <Input placeholder="Small input" />
  </TextField>

  <TextField size="md">
    <Label>Medium (default)</Label>
    <Input placeholder="Medium input" />
  </TextField>

  <TextField size="lg">
    <Label>Large</Label>
    <Input placeholder="Large input" />
  </TextField>
</div>
