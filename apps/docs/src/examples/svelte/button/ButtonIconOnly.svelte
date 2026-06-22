<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import {
    Camera01Icon,
    Folder02Icon,
    Share06Icon,
    EllipsisVerticalIcon,
    Delete02Icon
  } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center gap-2">
  <Button iconOnly aria-label="Open Camera">
    <Icon icon={Camera01Icon} />
  </Button>

  <Button variant="secondary" iconOnly aria-label="Explore Files">
    <Icon icon={Folder02Icon} />
  </Button>

  <Button variant="tertiary" iconOnly aria-label="Share">
    <Icon icon={Share06Icon} />
  </Button>

  <Button variant="outline" iconOnly aria-label="More Options">
    <Icon icon={EllipsisVerticalIcon} />
  </Button>

  <Button variant="danger" iconOnly aria-label="Delete">
    <Icon icon={Delete02Icon} />
  </Button>
</div>
