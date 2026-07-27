<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-64 gap-4">
  <div class="flex flex-col gap-2">
    <Label for="input-default">Default</Label>
    <Input id="input-default" variant="default" placeholder="Default input" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-secondary">Secondary</Label>
    <Input id="input-secondary" variant="secondary" placeholder="Secondary input" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-outline">Outline</Label>
    <Input id="input-outline" variant="outline" placeholder="Outline input" />
  </div>
</div>
