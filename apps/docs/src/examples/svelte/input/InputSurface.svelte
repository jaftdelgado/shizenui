<script lang="ts">
  import { Input, Label, Description, Surface } from "@shizen-ui/svelte";

  let workspaceUrl = $state("");
</script>

<div class="flex w-full max-w-72 flex-col">
  <Surface class="flex flex-col gap-2 p-4">
    <Label for="workspace-url">Workspace URL</Label>
    <Input
      id="workspace-url"
      bind:value={workspaceUrl}
      placeholder="https://app.example.com"
      aria-describedby="workspace-url-description"
    />
    <Description id="workspace-url-description">
      The address teammates use to open this workspace.
    </Description>
  </Surface>
</div>
