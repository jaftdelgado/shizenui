<script lang="ts">
  import { Checkbox, CheckboxGroup, Description, Label, Surface } from "@shizen-ui/svelte";

  let checkoutOptions = $state<string[]>(["inventory"]);

  const options = [
    {
      value: "guest-checkout",
      label: "Enable guest checkout",
      description: "Allow orders without an account."
    },
    {
      value: "inventory",
      label: "Track inventory",
      description: "Sync stock with incoming orders."
    },
    {
      value: "free-shipping",
      label: "Free shipping",
      description: "Waive shipping on qualifying orders."
    }
  ];
</script>

<div class="flex w-full max-w-72 flex-col">
  <Surface>
    <CheckboxGroup bind:value={checkoutOptions} aria-label="Checkout settings">
      <Label>Checkout settings</Label>
      <Description>Manage your storefront options.</Description>
      <CheckboxGroup.Items>
        {#each options as option}
          <Checkbox value={option.value}>
            <Checkbox.Control />
            <Checkbox.Content>
              <Label>{option.label}</Label>
              <Description>{option.description}</Description>
            </Checkbox.Content>
          </Checkbox>
        {/each}
      </CheckboxGroup.Items>
    </CheckboxGroup>
  </Surface>
</div>
