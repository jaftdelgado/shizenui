<script lang="ts">
  import { Chip, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <Description>Small</Description>
    <div class="flex gap-2">
      <Chip size="sm">UI</Chip>
      <Chip size="sm">UX</Chip>
      <Chip size="sm">Design</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Medium</Description>
    <div class="flex gap-2">
      <Chip size="md">HTML</Chip>
      <Chip size="md">CSS</Chip>
      <Chip size="md">JavaScript</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Large</Description>
    <div class="flex gap-2">
      <Chip size="lg">Framework</Chip>
      <Chip size="lg">Library</Chip>
      <Chip size="lg">Tool</Chip>
    </div>
  </div>
</div>
