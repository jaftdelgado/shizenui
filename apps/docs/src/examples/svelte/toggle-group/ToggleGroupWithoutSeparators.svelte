<script lang="ts">
  import { Description, Toggle, ToggleGroup } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { BoldIcon, TextItalicIcon, TextStrikethroughIcon } from "@hugeicons/core-free-icons";

  let defaultValues = $state<string[]>([]);
  let outlineValues = $state<string[]>([]);
  let ghostValues = $state<string[]>([]);
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <Description>Default</Description>
    <ToggleGroup
      variant="default"
      selectionMode="multiple"
      bind:value={defaultValues}
      hideSeparators
    >
      <Toggle value="bold">
        {#snippet startContent()}
          <Icon icon={BoldIcon} />
        {/snippet}
        Bold
      </Toggle>
      <Toggle value="italic">
        {#snippet startContent()}
          <Icon icon={TextItalicIcon} />
        {/snippet}
        Italic
      </Toggle>
      <Toggle value="strike">
        {#snippet startContent()}
          <Icon icon={TextStrikethroughIcon} />
        {/snippet}
        Strike
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Outline</Description>
    <ToggleGroup
      variant="outline"
      selectionMode="multiple"
      bind:value={outlineValues}
      hideSeparators
    >
      <Toggle value="bold">
        {#snippet startContent()}
          <Icon icon={BoldIcon} />
        {/snippet}
        Bold
      </Toggle>
      <Toggle value="italic">
        {#snippet startContent()}
          <Icon icon={TextItalicIcon} />
        {/snippet}
        Italic
      </Toggle>
      <Toggle value="strike">
        {#snippet startContent()}
          <Icon icon={TextStrikethroughIcon} />
        {/snippet}
        Strike
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Ghost</Description>
    <ToggleGroup variant="ghost" selectionMode="multiple" bind:value={ghostValues} hideSeparators>
      <Toggle value="bold">
        {#snippet startContent()}
          <Icon icon={BoldIcon} />
        {/snippet}
        Bold
      </Toggle>
      <Toggle value="italic">
        {#snippet startContent()}
          <Icon icon={TextItalicIcon} />
        {/snippet}
        Italic
      </Toggle>
      <Toggle value="strike">
        {#snippet startContent()}
          <Icon icon={TextStrikethroughIcon} />
        {/snippet}
        Strike
      </Toggle>
    </ToggleGroup>
  </div>
</div>
