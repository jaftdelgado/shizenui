<script lang="ts">
  import { TextField, Input, Label, Description } from "@shizen-ui/svelte";

  let projectName = $state("Website Template");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField bind:value={projectName}>
    <Label>Project name</Label>
    <Input placeholder="Enter the project name" />
    <Description>
      {projectName ? `Creating "${projectName}"` : "Name your project to get started"}
    </Description>
  </TextField>
</div>
