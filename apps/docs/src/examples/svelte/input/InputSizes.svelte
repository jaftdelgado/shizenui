<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-64 gap-5">
  <div class="flex flex-col gap-2">
    <Label for="input-sm">Small</Label>
    <Input id="input-sm" size="sm" placeholder="Small input" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-md">Medium</Label>
    <Input id="input-md" size="md" placeholder="Medium input" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-lg">Large</Label>
    <Input id="input-lg" size="lg" placeholder="Large input" />
  </div>
</div>
