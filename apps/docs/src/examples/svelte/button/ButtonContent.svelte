<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { ShoppingCartAdd01Icon, ScanIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center gap-2">
  <Button variant="tertiary">
    {#snippet endContent()}
      <Icon icon={ScanIcon} />
    {/snippet}
    Scan ID
  </Button>

  <Button>
    {#snippet startContent()}
      <Icon icon={ShoppingCartAdd01Icon} />
    {/snippet}
    Add to Cart
  </Button>
</div>
