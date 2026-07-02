<script lang="ts">
  import { Description, Toggle, ToggleGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { ShuffleIcon, RepeatIcon, MusicNote01Icon } from "@hugeicons/core-free-icons";

  let isShuffle = $state(false);
  let isRepeat = $state(true);
  let isCrossfade = $state(false);

  let activeMode = $state("normal");
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col items-start gap-2">
    <Description>Individual pressed state</Description>
    <ToggleGroup variant="outline">
      <Toggle bind:pressed={isShuffle}>
        {#snippet startContent()}
          <Icon icon={ShuffleIcon} />
        {/snippet}
        Shuffle
      </Toggle>
      <Toggle bind:pressed={isRepeat}>
        {#snippet startContent()}
          <Icon icon={RepeatIcon} />
        {/snippet}
        Repeat
      </Toggle>
      <Toggle bind:pressed={isCrossfade}>
        {#snippet startContent()}
          <Icon icon={MusicNote01Icon} />
        {/snippet}
        Crossfade
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col items-start gap-2">
    <Description>Exclusive selection</Description>
    <ToggleGroup variant="outline">
      <Toggle
        pressed={activeMode === "normal"}
        onPressedChange={() => (activeMode = "normal")}
      >
        Normal
      </Toggle>
      <Toggle
        pressed={activeMode === "repeat-one"}
        onPressedChange={() => (activeMode = "repeat-one")}
      >
        Repeat One
      </Toggle>
      <Toggle
        pressed={activeMode === "repeat-all"}
        onPressedChange={() => (activeMode = "repeat-all")}
      >
        Repeat All
      </Toggle>
    </ToggleGroup>
  </div>
</div>
