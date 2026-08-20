<script lang="ts">
  import { TextArea, Label, Description } from "@shizen-ui/svelte";

  let taskDescription = $state("");
  const maxLength = 500;
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="task-description">Task description</Label>
  <TextArea
    id="task-description"
    bind:value={taskDescription}
    rows={3}
    placeholder="What needs to be done?"
    aria-describedby="task-description-description"
  />
  <Description id="task-description-description">
    Explain the task's goal and any relevant context ({taskDescription.length}/{maxLength})
  </Description>
</div>
