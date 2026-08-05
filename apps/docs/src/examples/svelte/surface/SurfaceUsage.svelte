<script lang="ts">
  import { Surface, Label, Description, Input, Button, Checkbox } from "@shizen-ui/svelte";

  let email = $state("");
  let subscribe = $state(true);
</script>

<div class="flex w-full max-w-80 items-center">
  <Surface class="flex w-full flex-col gap-4">
    <div class="flex flex-col">
      <Label>Join the newsletter</Label>
      <Description>Get product updates delivered to your inbox.</Description>
    </div>

    <div class="flex w-full flex-col gap-2">
      <div class="flex w-full gap-2">
        <Input size="sm" bind:value={email} placeholder="name@email.com" class="flex-1" />
        <Button size="sm">Confirm</Button>
      </div>

      <Checkbox bind:checked={subscribe}>
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>Send me occasional offers too</Label>
        </Checkbox.Content>
      </Checkbox>
    </div>
  </Surface>
</div>
