<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";

  let email = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="email">Email</Label>
  <Input id="email" bind:value={email} placeholder="Enter your email" />
</div>
