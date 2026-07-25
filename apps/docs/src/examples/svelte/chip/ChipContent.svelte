<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { BadgePercentIcon, DeliveryTruck01Icon } from "@hugeicons/core-free-icons";
</script>

<div class="flex max-w-lg flex-wrap items-center gap-2">
  <Chip variant="secondary">
    {#snippet startContent()}
      <Icon icon={BadgePercentIcon} />
    {/snippet}
    30% off
  </Chip>

  <Chip variant="soft" color="accent">
    {#snippet endContent()}
      <Icon icon={DeliveryTruck01Icon} />
    {/snippet}
    Free Shipping
  </Chip>
</div>
