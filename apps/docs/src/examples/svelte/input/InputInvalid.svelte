<script lang="ts">
  import { Input, Label, FieldError } from "@shizen-ui/svelte";

  let couponCode = $state("SAVE20XX");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="coupon">Coupon code</Label>
  <Input id="coupon" bind:value={couponCode} invalid placeholder="Enter coupon code" />
  <FieldError invalid>This coupon code has expired or is invalid.</FieldError>
</div>
