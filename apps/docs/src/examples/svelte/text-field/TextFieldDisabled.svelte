<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let boardName = $state("Sprint 24' Backlog");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField disabled bind:value={boardName}>
    <Label>Board name</Label>
    <Input />
    <Description>Only the board owner can rename this board</Description>
  </TextField>
</div>
