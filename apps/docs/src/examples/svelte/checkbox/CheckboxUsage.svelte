<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  let agree = $state(false);
</script>

<div class="flex flex-col">
  <Checkbox bind:checked={agree}>
    <Checkbox.Control />

    <Checkbox.Content>
      <Label>Accept terms and conditions</Label>
      <Description>Agree to our terms and conditions</Description>
    </Checkbox.Content>
  </Checkbox>
</div>
