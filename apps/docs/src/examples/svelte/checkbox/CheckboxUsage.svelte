<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  let promotions = $state(false);
  let agree = $state(true);
</script>

<div class="flex flex-col gap-4">
  <Checkbox bind:checked={promotions}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Receive promotional emails</Label>
      <Description>Get updates on offers and news</Description>
    </Checkbox.Content>
  </Checkbox>

  <Checkbox bind:checked={agree}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Accept terms and conditions</Label>
      <Description>Agree to our terms and conditions</Description>
    </Checkbox.Content>
  </Checkbox>
</div>
