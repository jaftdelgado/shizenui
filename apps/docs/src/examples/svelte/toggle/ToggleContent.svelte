<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { PackageMovingIcon, SaleTag02Icon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center gap-2">
  <Toggle>
    {#snippet startContent()}
      <Icon icon={SaleTag02Icon} />
    {/snippet}
    On Sale
  </Toggle>

  <Toggle>
    {#snippet endContent()}
      <Icon icon={PackageMovingIcon} />
    {/snippet}
    Free Shipping
  </Toggle>
</div>
