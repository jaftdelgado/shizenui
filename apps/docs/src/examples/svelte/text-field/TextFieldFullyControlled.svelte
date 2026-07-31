<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let tagInput = $state("");

  function getValue() {
    return tagInput;
  }

  function setValue(newValue: string) {
    tagInput = newValue.replace(/\s+/g, "-").toLowerCase();
  }
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField bind:value={getValue, setValue}>
    <Label>Branch name</Label>
    <Input placeholder="Enter branch name" />
    <Description>Spaces are converted to hyphens automatically as you type</Description>
  </TextField>
</div>
