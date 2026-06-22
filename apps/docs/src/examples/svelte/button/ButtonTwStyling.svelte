<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Call02Icon, Search01Icon, Video02Icon } from "@hugeicons/core-free-icons";
</script>

<div class="flex w-full max-w-xs items-center gap-3">
  <Button
    variant="secondary"
    class="h-auto flex-1 rounded-2xl py-2 [&_.button\_\_content]:flex-col [&_.button\_\_content]:gap-1.5 [&_.button\_\_icon--start]:m-0"
  >
    {#snippet startContent()}
      <Icon icon={Call02Icon} size={20} />
    {/snippet}
    Audio
  </Button>

  <Button
    variant="secondary"
    class="h-auto flex-1 rounded-2xl py-2 [&_.button\_\_content]:flex-col [&_.button\_\_content]:gap-1.5 [&_.button\_\_icon--start]:m-0"
  >
    {#snippet startContent()}
      <Icon icon={Video02Icon} size={20} />
    {/snippet}
    Video
  </Button>

  <Button
    variant="secondary"
    class="h-auto flex-1 rounded-2xl py-2 [&_.button\_\_content]:flex-col [&_.button\_\_content]:gap-1.5 [&_.button\_\_icon--start]:m-0"
  >
    {#snippet startContent()}
      <Icon icon={Search01Icon} size={20} />
    {/snippet}
    Search
  </Button>
</div>
