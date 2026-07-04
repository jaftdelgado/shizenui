<script lang="ts">
  import { Description, Toggle, ToggleGroup } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { BoldIcon, TextItalicIcon, TextStrikethroughIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <Description>Default</Description>
    <ToggleGroup variant="default" hideSeparators>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={BoldIcon} />
        {/snippet}
        Bold
      </Toggle>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={TextItalicIcon} />
        {/snippet}
        Italic
      </Toggle>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={TextStrikethroughIcon} />
        {/snippet}
        Strike
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Outline</Description>
    <ToggleGroup variant="outline" hideSeparators>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={BoldIcon} />
        {/snippet}
        Bold
      </Toggle>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={TextItalicIcon} />
        {/snippet}
        Italic
      </Toggle>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={TextStrikethroughIcon} />
        {/snippet}
        Strike
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Ghost</Description>
    <ToggleGroup variant="ghost" hideSeparators>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={BoldIcon} />
        {/snippet}
        Bold
      </Toggle>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={TextItalicIcon} />
        {/snippet}
        Italic
      </Toggle>
      <Toggle>
        {#snippet startContent()}
          <Icon icon={TextStrikethroughIcon} />
        {/snippet}
        Strike
      </Toggle>
    </ToggleGroup>
  </div>
</div>
