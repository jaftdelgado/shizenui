<script lang="ts">
  import { TextField, InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { DatabaseIcon } from "@hugeicons/core-free-icons";

  let databaseName = $state("sql-database");

  function getValue() {
    return databaseName;
  }

  function setValue(newValue: string) {
    databaseName = newValue.replace(/\s+/g, "-").toLowerCase();
  }
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField bind:value={getValue, setValue}>
    <Label>Database name</Label>
    <InputGroup placeholder="Enter database name">
      <InputGroup.Prefix>
        <Icon icon={DatabaseIcon} />
      </InputGroup.Prefix>
      <InputGroup.Input />
    </InputGroup>
    <Description>Spaces are converted to hyphens automatically as you type</Description>
  </TextField>
</div>
