<script lang="ts">
  import { Chip, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Playlist01Icon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center gap-3">
  <Chip variant="secondary" class="rounded-lg text-indigo-700">
    {#snippet startContent()}
      <Icon icon={Playlist01Icon} />
    {/snippet}
    Playlist
  </Chip>
  <div class="flex items-center gap-0">
    <Chip variant="ghost" class="rounded-none px-1">38 songs</Chip>
    <Description class="select-none">•</Description>
    <Chip variant="ghost" class="rounded-none px-1">2h 8 min</Chip>
  </div>
</div>
