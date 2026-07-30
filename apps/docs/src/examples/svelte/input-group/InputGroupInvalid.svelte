<script lang="ts">
  import { InputGroup, Chip, Label, FieldError } from "@shizen-ui/svelte";

  let apiKey = $state("pk_test_51H8x2K");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="secret-api-key">Secret API key</Label>
  <InputGroup invalid>
    <InputGroup.Input
      id="secret-api-key"
      bind:value={apiKey}
      type="text"
      aria-describedby="secret-api-key-error"
      placeholder="sk_live_..."
    />
    <InputGroup.Suffix class="-mr-1">
      <Chip color="danger">Invalid</Chip>
    </InputGroup.Suffix>
  </InputGroup>
  <FieldError id="secret-api-key-error">
    You entered a publishable key. Secret keys start with sk_live_ or sk_test_
  </FieldError>
</div>
