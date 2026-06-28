<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { DashedLineCircleIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex flex-col gap-8">
  <div class="flex items-center gap-2">
    <Toggle size="sm">
      {#snippet startContent()}
        <Icon icon={DashedLineCircleIcon} size={16} />
      {/snippet}
      Small
    </Toggle>
    <Toggle size="md">
      {#snippet startContent()}
        <Icon icon={DashedLineCircleIcon} size={16} />
      {/snippet}
      Medium
    </Toggle>
    <Toggle size="lg">
      {#snippet startContent()}
        <Icon icon={DashedLineCircleIcon} size={20} />
      {/snippet}
      Large
    </Toggle>
  </div>

  <div class="flex items-center gap-2">
    <Toggle size="sm" iconOnly aria-label="Small">
      <Icon icon={DashedLineCircleIcon} size={16} />
    </Toggle>
    <Toggle size="md" iconOnly aria-label="Medium">
      <Icon icon={DashedLineCircleIcon} size={16} />
    </Toggle>
    <Toggle size="lg" iconOnly aria-label="Large">
      <Icon icon={DashedLineCircleIcon} size={20} />
    </Toggle>
  </div>
</div>
