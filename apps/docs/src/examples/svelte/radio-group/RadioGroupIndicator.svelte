<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Tick02Icon } from "@hugeicons/core-free-icons";

  let selectedMethod = $state("credit_card");

  const paymentMethods = [
    {
      value: "credit_card",
      label: "Credit Card",
      description: "Visa, Mastercard, or Amex."
    },
    {
      value: "paypal",
      label: "PayPal",
      description: "Pay using your PayPal account."
    },
    {
      value: "bank_transfer",
      label: "Bank Transfer",
      description: "Direct bank-to-bank transfer."
    }
  ];
</script>

<div class="flex-center justify-center p-4">
  <RadioGroup bind:value={selectedMethod} name="payment-method">
    <Label>Payment Method</Label>
    <Description>Select how you want to pay for your order.</Description>

    <RadioGroup.Items>
      {#each paymentMethods as method}
        <Radio value={method.value}>
          <Radio.Control>
            <Radio.Indicator>
              <Icon icon={Tick02Icon} class="size-2" strokeWidth={5} />
            </Radio.Indicator>
          </Radio.Control>
          <Radio.Content>
            <Label>{method.label}</Label>
            <Description>{method.description}</Description>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>
</div>
