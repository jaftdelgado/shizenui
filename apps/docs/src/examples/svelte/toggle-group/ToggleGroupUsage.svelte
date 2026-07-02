<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import {
    TextBoldIcon,
    TextItalicIcon,
    TextUnderlineIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    TextAlignJustifyCenterIcon,
    ListViewIcon,
    LeftToRightListBulletIcon
  } from "@hugeicons/core-free-icons";

  let isBold = $state(false);
  let isItalic = $state(false);
  let isUnderline = $state(true);

  let activeAlignment = $state("left");

  let isBulletList = $state(false);
  let isNumberedList = $state(true);
</script>

<div class="flex flex-wrap gap-3">
  <ToggleGroup variant="default">
    <Toggle bind:pressed={isBold} aria-label="Bold" iconOnly>
      <Icon icon={TextBoldIcon} />
    </Toggle>

    <Toggle bind:pressed={isItalic} aria-label="Italic" iconOnly>
      <Icon icon={TextItalicIcon} />
    </Toggle>

    <Toggle bind:pressed={isUnderline} aria-label="Underline" iconOnly>
      <Icon icon={TextUnderlineIcon} />
    </Toggle>
  </ToggleGroup>

  <ToggleGroup variant="outline">
    <Toggle
      pressed={activeAlignment === "left"}
      onPressedChange={() => (activeAlignment = "left")}
      aria-label="Align left"
      iconOnly
    >
      <Icon icon={TextAlignLeftIcon} />
    </Toggle>

    <Toggle
      pressed={activeAlignment === "center"}
      onPressedChange={() => (activeAlignment = "center")}
      aria-label="Align center"
      iconOnly
    >
      <Icon icon={TextAlignCenterIcon} />
    </Toggle>

    <Toggle
      pressed={activeAlignment === "right"}
      onPressedChange={() => (activeAlignment = "right")}
      aria-label="Align right"
      iconOnly
    >
      <Icon icon={TextAlignRightIcon} />
    </Toggle>

    <Toggle
      pressed={activeAlignment === "justify"}
      onPressedChange={() => (activeAlignment = "justify")}
      aria-label="Justify"
      iconOnly
    >
      <Icon icon={TextAlignJustifyCenterIcon} />
    </Toggle>
  </ToggleGroup>

  <ToggleGroup variant="ghost">
    <Toggle bind:pressed={isBulletList}>
      {#snippet startContent()}
        <Icon icon={ListViewIcon} />
      {/snippet}
      Bullet list
    </Toggle>

    <Toggle bind:pressed={isNumberedList}>
      {#snippet startContent()}
        <Icon icon={LeftToRightListBulletIcon} />
      {/snippet}
      Numbered list
    </Toggle>
  </ToggleGroup>
</div>
