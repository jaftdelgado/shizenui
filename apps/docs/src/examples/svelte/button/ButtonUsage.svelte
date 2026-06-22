<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import {
    Download01Icon,
    Share01Icon,
    PencilEdit01Icon,
    Copy01Icon,
    EyeIcon,
    Delete01Icon,
    Cancel01Icon
  } from "@hugeicons/core-free-icons";
</script>

<div class="flex max-w-lg flex-wrap items-center gap-3">
  <Button variant="primary">
    {#snippet startContent()}
      <Icon icon={Download01Icon} />
    {/snippet}
    Export
  </Button>

  <Button variant="secondary">
    {#snippet startContent()}
      <Icon icon={Share01Icon} />
    {/snippet}
    Share
  </Button>

  <Button variant="tertiary">
    {#snippet startContent()}
      <Icon icon={Copy01Icon} />
    {/snippet}
    Duplicate
  </Button>

  <Button variant="ghost">
    {#snippet startContent()}
      <Icon icon={EyeIcon} />
    {/snippet}
    Preview
  </Button>

  <Button variant="outline">
    {#snippet startContent()}
      <Icon icon={PencilEdit01Icon} />
    {/snippet}
    Edit
  </Button>

  <Button variant="danger">
    {#snippet startContent()}
      <Icon icon={Delete01Icon} />
    {/snippet}
    Delete Project
  </Button>

  <Button variant="soft-danger">
    {#snippet startContent()}
      <Icon icon={Cancel01Icon} />
    {/snippet}
    Discard Changes
  </Button>
</div>
