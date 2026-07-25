<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import {
    BadgeCheckIcon,
    Location03Icon,
    Download01Icon,
    FlameIcon,
    AlertDiamondIcon,
    CancelCircleIcon,
    LiveStreaming02Icon
  } from "@hugeicons/core-free-icons";
</script>

<div class="flex w-full max-w-xs flex-wrap items-center gap-2">
  <Chip variant="primary" color="accent">
    {#snippet startContent()}
      <Icon icon={BadgeCheckIcon} />
    {/snippet}
    Verified
  </Chip>
  <Chip>
    {#snippet startContent()}
      <Icon icon={Location03Icon} />
    {/snippet}
    Cupertino, CA
  </Chip>
  <Chip color="danger">
    {#snippet startContent()}
      <Icon icon={LiveStreaming02Icon} />
    {/snippet}
    Live
  </Chip>
  <Chip variant="secondary">
    {#snippet startContent()}
      <Icon icon={Download01Icon} />
    {/snippet}
    12.8K
  </Chip>
  <Chip variant="secondary" color="accent">
    {#snippet startContent()}
      <Icon icon={FlameIcon} />
    {/snippet}
    Popular
  </Chip>
  <Chip variant="soft" color="accent">Pro</Chip>
  <Chip variant="soft" color="success">Active now</Chip>
  <Chip variant="soft" color="warning">
    {#snippet startContent()}
      <Icon icon={AlertDiamondIcon} />
    {/snippet}
    Experimental
  </Chip>
  <Chip variant="soft" color="danger">
    {#snippet startContent()}
      <Icon icon={CancelCircleIcon} />
    {/snippet}
    Rejected
  </Chip>
</div>
