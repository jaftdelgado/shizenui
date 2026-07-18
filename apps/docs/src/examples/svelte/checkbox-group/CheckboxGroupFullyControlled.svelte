<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description, Button } from "@shizen-ui/svelte";

  let paymentMethods = $state<string[]>(["visa"]);
  let lastSaved = $state<string[]>(["visa"]);

  const methods = [
    {
      value: "visa",
      label: "Visa"
    },
    {
      value: "paypal",
      label: "PayPal"
    },
    {
      value: "apple-pay",
      label: "Apple Pay"
    },
    {
      value: "google-pay",
      label: "Google Pay"
    }
  ];

  const hasTooManySelected = $derived(paymentMethods.length > 2);

  function getValue() {
    return paymentMethods;
  }

  function setValue(nextValue: string[]) {
    paymentMethods = nextValue;
  }

  function handleSubmit() {
    lastSaved = [...paymentMethods];
  }
</script>

<div class="flex w-full max-w-64 flex-col gap-6">
  <CheckboxGroup bind:value={getValue, setValue}>
    <Label>Accepted Payment Methods</Label>
    <Description>Select up to two payment methods.</Description>
    <CheckboxGroup.Items>
      {#each methods as method}
        <Checkbox value={method.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{method.label}</Label>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <Button variant="primary" size="sm" disabled={hasTooManySelected} onclick={handleSubmit}>
    Save
  </Button>
</div>
