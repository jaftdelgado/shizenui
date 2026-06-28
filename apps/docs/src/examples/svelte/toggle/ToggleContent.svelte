<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { PackageMovingIcon, SaleTag02Icon } from "@hugeicons/core-free-icons";

  let onSale = $state(false);
  let fastShipping = $state(true);
</script>

<div class="flex items-center gap-2">
  <Toggle bind:pressed={onSale}>
    {#snippet startContent()}
      <Icon icon={SaleTag02Icon} />
    {/snippet}
    On Sale
  </Toggle>

  <Toggle bind:pressed={fastShipping}>
    {#snippet endContent()}
      <Icon icon={PackageMovingIcon} />
    {/snippet}
    Fast Shipping
  </Toggle>
</div>
