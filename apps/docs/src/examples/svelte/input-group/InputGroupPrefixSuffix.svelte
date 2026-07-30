<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Image02Icon } from "@hugeicons/core-free-icons";

  let fileName = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="export-name">Export file name</Label>
  <InputGroup>
    <InputGroup.Prefix>
      <Icon icon={Image02Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input
      id="export-name"
      bind:value={fileName}
      placeholder="untitled"
      aria-describedby="export-name-hint"
    />
    <InputGroup.Suffix>.png</InputGroup.Suffix>
  </InputGroup>
  <Description id="export-name-hint">Choose a name for the exported image file.</Description>
</div>
