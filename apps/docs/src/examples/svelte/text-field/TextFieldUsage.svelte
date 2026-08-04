<script lang="ts">
  import { TextField, InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Briefcase05Icon } from "@hugeicons/core-free-icons";

  let companyName = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField bind:value={companyName}>
    <Label>Company Name</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <Icon icon={Briefcase05Icon} />
      </InputGroup.Prefix>
      <InputGroup.Input placeholder="Enter company name" />
    </InputGroup>
    <Description>This will be shown on your public profile.</Description>
  </TextField>
</div>
