<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisVerticalIcon
  } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center justify-center gap-2">
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
    <Button iconOnly>
      <Icon icon={EllipsisVerticalIcon} />
    </Button>
  </ButtonGroup>
</div>
