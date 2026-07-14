<script lang="ts">
  import { Checkbox, Label } from "@shizen-ui/svelte";

  let wordWrap = $state(true);
  let formatOnSave = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Checkbox bind:checked={wordWrap}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Word wrap</Label>
    </Checkbox.Content>
  </Checkbox>

  <Checkbox bind:checked={formatOnSave}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Format on save</Label>
    </Checkbox.Content>
  </Checkbox>
</div>
