<script lang="ts">
  import { Input, Label, Description } from "@shizen-ui/svelte";

  let username = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="username">Username</Label>
  <Input id="username" bind:value={username} placeholder="Enter your username" />
  <Description>
    Preview:
    <Description class="font-medium">
      github.com/{username || "username"}
    </Description>
  </Description>
</div>
