<script lang="ts">
  import { TextField, InputGroup, Label, Description, FieldError } from "@shizen-ui/svelte";

  const maxLength = 16;
  let nickname = $state("");

  let isInvalid = $derived(nickname.length > maxLength);
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <TextField invalid={isInvalid} bind:value={nickname}>
    <Label>Nickname</Label>
    <InputGroup>
      <InputGroup.Input placeholder="Enter a nickname" />
      <InputGroup.Suffix class="tabular-nums">{nickname.length}/{maxLength}</InputGroup.Suffix>
    </InputGroup>
    <Description>Shown to other players in-game</Description>
    <FieldError>Nickname must be {maxLength} characters or fewer</FieldError>
  </TextField>
</div>
