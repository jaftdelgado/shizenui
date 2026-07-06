<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { PencilIcon, PenTool02Icon, PaintBucketIcon } from "@hugeicons/core-free-icons";

  let brushType = $state<string | undefined>("pencil");
  let isSyncing = $state(false);

  function getBrushType() {
    return brushType;
  }

  function setBrushType(next: string | undefined) {
    if (isSyncing) return;

    isSyncing = true;
    setTimeout(() => {
      brushType = next;
      isSyncing = false;
    }, 300);
  }
</script>

<div class="flex flex-col items-start gap-2">
  <Description>
    {isSyncing ? "Syncing brush with canvas…" : `Active brush: ${brushType}`}
  </Description>
  <ToggleGroup selectionMode="single" bind:value={getBrushType, setBrushType}>
    <Toggle value="pencil">
      {#snippet startContent()}
        <Icon icon={PencilIcon} />
      {/snippet}
      Pencil
    </Toggle>
    <Toggle value="pen">
      {#snippet startContent()}
        <Icon icon={PenTool02Icon} />
      {/snippet}
      Pen
    </Toggle>
    <Toggle value="fill">
      {#snippet startContent()}
        <Icon icon={PaintBucketIcon} />
      {/snippet}
      Fill
    </Toggle>
  </ToggleGroup>
</div>
