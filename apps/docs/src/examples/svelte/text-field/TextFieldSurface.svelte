<script lang="ts">
  import { TextField, Surface, InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";

  let email = $state("");
</script>

<div class="flex w-full max-w-72 flex-col">
  <Surface class="p-4">
    <TextField bind:value={email}>
      <Label>Email</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon icon={Mail01Icon} />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="name@email.com" />
      </InputGroup>
      <Description>Subscribe to get updates in your inbox.</Description>
    </TextField>
  </Surface>
</div>
