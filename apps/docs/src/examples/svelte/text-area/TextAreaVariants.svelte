<script lang="ts">
  import { TextArea, Label } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-64 gap-4">
  <div class="flex flex-col gap-2">
    <Label for="textarea-default">Default</Label>
    <TextArea id="textarea-default" variant="default" rows={3} placeholder="Default text area" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="textarea-secondary">Secondary</Label>
    <TextArea
      id="textarea-secondary"
      variant="secondary"
      rows={3}
      placeholder="Secondary text area"
    />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="textarea-outline">Outline</Label>
    <TextArea id="textarea-outline" variant="outline" rows={3} placeholder="Outline text area" />
  </div>
</div>
