<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { CircleDashedIcon, ScanIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex flex-col gap-8">
  <div class="flex items-center gap-3">
    <Button size="sm">
      {#snippet startContent()}
        <Icon icon={CircleDashedIcon} size={16} />
      {/snippet}
      Small
    </Button>
    <Button size="md">
      {#snippet startContent()}
        <Icon icon={CircleDashedIcon} size={20} />
      {/snippet}
      Medium
    </Button>
    <Button size="lg">
      {#snippet startContent()}
        <Icon icon={CircleDashedIcon} size={20} />
      {/snippet}
      Large
    </Button>
  </div>

  <div class="flex items-center gap-3">
    <Button size="sm" variant="secondary" iconOnly aria-label="Small">
      <Icon icon={CircleDashedIcon} size={16} />
    </Button>
    <Button size="md" variant="secondary" iconOnly aria-label="Medium">
      <Icon icon={CircleDashedIcon} size={20} />
    </Button>
    <Button size="lg" variant="secondary" iconOnly aria-label="Large">
      <Icon icon={CircleDashedIcon} size={20} />
    </Button>
  </div>
</div>
