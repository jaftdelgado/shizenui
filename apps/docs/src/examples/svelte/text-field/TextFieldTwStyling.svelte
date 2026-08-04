<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let name = $state("");
  let phone = $state("");
</script>

<div class="flex w-full max-w-64 flex-col">
  <TextField
    bind:value={name}
    class="bg-surface border-separator flex h-10 flex-row items-center gap-2 rounded-t-2xl border-b"
  >
    <Label class="ml-3 w-14 shrink-0">Name:</Label>
    <Input
      placeholder="John Doe"
      class="h-full w-full rounded-none bg-transparent px-3 shadow-none focus:shadow-none focus:ring-0"
    />
  </TextField>
  <TextField
    bind:value={phone}
    class="bg-surface flex h-10 flex-row items-center gap-2 rounded-b-2xl"
  >
    <Label class="ml-3 w-14 shrink-0">Phone:</Label>
    <Input
      type="tel"
      placeholder="+1 (404) 957-8068"
      class="h-full w-full rounded-none bg-transparent px-3 shadow-none focus:shadow-none focus:ring-0"
    />
  </TextField>
</div>
