<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { ShuffleIcon, RepeatIcon, RepeatOne01Icon } from "@hugeicons/core-free-icons";

  let mode = $state<string | undefined>("shuffle");
</script>

<div class="flex flex-col items-center gap-4">
  <ToggleGroup
    selectionMode="single"
    bind:value={mode}
    hideSeparators
    variant="ghost"
    class="gap-1 rounded-full bg-neutral-800 p-1 [&_.toggle]:rounded-full! [&_.toggle]:text-white [&_.toggle:hover]:bg-neutral-400/30! [&_.toggle[aria-pressed='true']]:bg-emerald-400! [&_.toggle[aria-pressed='true']]:text-neutral-950!"
  >
    <Toggle value="shuffle" aria-label="Shuffle">
      <Icon icon={ShuffleIcon} size={18} stroke={2} />
    </Toggle>
    <Toggle value="repeat" aria-label="Repeat">
      <Icon icon={RepeatIcon} size={18} stroke={2} />
    </Toggle>
    <Toggle value="repeat-one" aria-label="Repeat one">
      <Icon icon={RepeatOne01Icon} size={18} stroke={2} />
    </Toggle>
  </ToggleGroup>
</div>
