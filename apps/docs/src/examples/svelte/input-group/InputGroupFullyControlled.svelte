<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { CouponPercentIcon } from "@hugeicons/core-free-icons";

  let couponCode = $state("");

  function getValue() {
    return couponCode;
  }

  function setValue(newValue: string) {
    couponCode = newValue.toUpperCase().slice(0, 12);
  }
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="coupon-code">Coupon code</Label>
  <InputGroup>
    <InputGroup.Prefix>
      <Icon icon={CouponPercentIcon} />
    </InputGroup.Prefix>
    <InputGroup.Input id="coupon-code" placeholder="SAVE20" bind:value={getValue, setValue} />
  </InputGroup>
  <Description>Codes are automatically formatted to uppercase, max 12 characters.</Description>
</div>
