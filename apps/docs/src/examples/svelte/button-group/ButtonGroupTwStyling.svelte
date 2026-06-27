<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { GithubIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex flex-col items-center gap-4">
  <ButtonGroup
    variant="tertiary"
    hideSeparator
    class="[&_.button]:rounded-control! gap-1.5 rounded-full bg-neutral-800 p-1.5"
  >
    <Button>Portfolio</Button>
    <Button>Blog</Button>
    <Button>Contact</Button>
    <Button aria-label="GitHub">
      <Icon icon={GithubIcon} size={20} stroke={2} />
    </Button>
  </ButtonGroup>
</div>
