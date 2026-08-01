<script lang="ts">
  import { TextField, InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { BedDoubleIcon } from "@hugeicons/core-free-icons";

  let bedrooms = $state("2");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField required bind:value={bedrooms}>
    <Label>Bedrooms</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <Icon icon={BedDoubleIcon} />
      </InputGroup.Prefix>
      <InputGroup.Input type="number" min="1" />
      <InputGroup.Suffix>rooms</InputGroup.Suffix>
    </InputGroup>
    <Description>Number of bedrooms available in the property.</Description>
  </TextField>
</div>
