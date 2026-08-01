<script lang="ts">
  import { TextField, Input, Label } from "@shizen-ui/svelte";
</script>

<div class="flex w-full max-w-64 flex-col gap-4">
  <TextField variant="default">
    <Label>Default</Label>
    <Input placeholder="Default input" />
  </TextField>

  <TextField variant="secondary">
    <Label>Secondary</Label>
    <Input placeholder="Secondary input" />
  </TextField>

  <TextField variant="outline">
    <Label>Outline</Label>
    <Input placeholder="Outline input" />
  </TextField>
</div>
