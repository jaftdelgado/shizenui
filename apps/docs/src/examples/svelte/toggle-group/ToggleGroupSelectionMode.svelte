<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { ShuffleIcon, RepeatIcon, MusicNote01Icon } from "@hugeicons/core-free-icons";

  let mode = $state<string | undefined>("normal");
  let effects = $state<string[]>(["repeat"]);
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col items-start gap-2">
    <Description>Single selection</Description>
    <ToggleGroup variant="outline" selectionMode="single" bind:value={mode}>
      <Toggle value="normal">Normal</Toggle>
      <Toggle value="repeat-one">Repeat One</Toggle>
      <Toggle value="repeat-all">Repeat All</Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col items-start gap-2">
    <Description>Multiple selection</Description>
    <ToggleGroup variant="outline" selectionMode="multiple" bind:value={effects}>
      <Toggle value="shuffle">
        {#snippet startContent()}
          <Icon icon={ShuffleIcon} />
        {/snippet}
        Shuffle
      </Toggle>
      <Toggle value="repeat">
        {#snippet startContent()}
          <Icon icon={RepeatIcon} />
        {/snippet}
        Repeat
      </Toggle>
      <Toggle value="crossfade">
        {#snippet startContent()}
          <Icon icon={MusicNote01Icon} />
        {/snippet}
        Crossfade
      </Toggle>
    </ToggleGroup>
  </div>
</div>
