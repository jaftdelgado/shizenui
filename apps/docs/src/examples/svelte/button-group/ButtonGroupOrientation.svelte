<script lang="ts">
  import { Button, ButtonGroup, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { UserCircleIcon, InboxIcon, EllipsisVerticalIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-start gap-8">
  <div class="flex flex-col gap-2">
    <Description>Horizontal</Description>
    <ButtonGroup variant="secondary" orientation="horizontal">
      <Button iconOnly={true} aria-label="Profile">
        <Icon icon={UserCircleIcon} />
      </Button>

      <Button iconOnly={true} aria-label="Messages">
        <Icon icon={InboxIcon} />
      </Button>

      <Button iconOnly={true} aria-label="Settings">
        <Icon icon={EllipsisVerticalIcon} />
      </Button>
    </ButtonGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Vertical</Description>
    <ButtonGroup variant="secondary" orientation="vertical">
      <Button iconOnly={true} aria-label="Profile">
        <Icon icon={UserCircleIcon} />
      </Button>

      <Button iconOnly={true} aria-label="Messages">
        <Icon icon={InboxIcon} />
      </Button>

      <Button iconOnly={true} aria-label="Settings">
        <Icon icon={EllipsisVerticalIcon} />
      </Button>
    </ButtonGroup>
  </div>
</div>
