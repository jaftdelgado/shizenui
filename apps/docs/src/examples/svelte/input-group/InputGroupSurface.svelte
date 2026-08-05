<script lang="ts">
  import { InputGroup, Surface, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { CreditCardIcon } from "@hugeicons/core-free-icons";

  let cardNumber = $state("");
</script>

<div class="flex w-full max-w-72 flex-col">
  <Surface class="flex flex-col gap-2 p-4">
    <Label for="card-number">Card number</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <Icon icon={CreditCardIcon} />
      </InputGroup.Prefix>
      <InputGroup.Input
        id="card-number"
        bind:value={cardNumber}
        placeholder="1234 5678 9012 3456"
        aria-describedby="card-number-description"
      />
    </InputGroup>
    <Description id="card-number-description">
      Used for your monthly subscription charge.
    </Description>
  </Surface>
</div>
