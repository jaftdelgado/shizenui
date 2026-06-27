<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisVerticalIcon,
    Folder02Icon,
    Link02Icon,
    File02Icon,
    Call02Icon,
    Video02Icon,
    Search01Icon,
    UndoIcon,
    RedoIcon,
    Copy01Icon,
    ClipboardPasteIcon,
    Cancel01Icon,
    Delete02Icon,
    RestoreBinIcon,
    AlertCircleIcon
  } from "@hugeicons/core-free-icons";
</script>

<div class="max-w-auto flex flex-wrap items-start gap-3 sm:max-w-sm">
  <ButtonGroup variant="secondary">
    <Button iconOnly aria-label="Previous">
      <Icon icon={ChevronLeftIcon} />
    </Button>

    <Button iconOnly aria-label="Next">
      <Icon icon={ChevronRightIcon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button>Years</Button>
    <Button>Months</Button>
    <Button>Days</Button>
    <Button iconOnly aria-label="More options">
      <Icon icon={EllipsisVerticalIcon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup variant="tertiary">
    <Button>
      {#snippet startContent()}
        <Icon icon={Folder02Icon} />
      {/snippet}
      Files
    </Button>
    <Button>
      {#snippet startContent()}
        <Icon icon={Link02Icon} />
      {/snippet}
      Links
    </Button>
    <Button>
      {#snippet startContent()}
        <Icon icon={File02Icon} />
      {/snippet}
      Docs
    </Button>
  </ButtonGroup>

  <ButtonGroup variant="outline">
    <Button iconOnly aria-label="Crop">
      <Icon icon={Call02Icon} />
    </Button>
    <Button iconOnly aria-label="Rotate">
      <Icon icon={Video02Icon} />
    </Button>
    <Button iconOnly aria-label="Flip">
      <Icon icon={Search01Icon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup variant="ghost">
    <Button iconOnly aria-label="Undo">
      <Icon icon={UndoIcon} />
    </Button>
    <Button iconOnly aria-label="Redo">
      <Icon icon={RedoIcon} />
    </Button>
    <Button iconOnly aria-label="Copy">
      <Icon icon={Copy01Icon} />
    </Button>
    <Button iconOnly aria-label="Paste">
      <Icon icon={ClipboardPasteIcon} />
    </Button>
  </ButtonGroup>

  <ButtonGroup variant="soft-danger">
    <Button>
      {#snippet startContent()}
        <Icon icon={Cancel01Icon} />
      {/snippet}
      Discard
    </Button>
    <Button>
      {#snippet startContent()}
        <Icon icon={Delete02Icon} />
      {/snippet}
      Delete
    </Button>
  </ButtonGroup>
</div>
