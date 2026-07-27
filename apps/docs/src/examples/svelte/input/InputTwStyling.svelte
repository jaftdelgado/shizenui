<script lang="ts">
  import { Input, Label, Description } from "@shizen-ui/svelte";

  let value = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="material-input">Label</Label>
  <Input
    id="material-input"
    bind:value
    placeholder="Input text"
    class="bg-control rounded-t-md rounded-b-none border-b-2 border-neutral-400 shadow-none focus:border-indigo-600 focus:ring-0"
  />
</div>
