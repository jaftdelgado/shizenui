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
    SquareLock02Icon,
    UserGroupIcon,
    Globe02Icon
  } from "@hugeicons/core-free-icons";

  let formats = $state<string[]>([]);
  let viewMode = $state<string | undefined>("grid");

  let channels = $state<string[]>(["email", "sms", "push"]);
  let activeAlignment = $state<string | undefined>("center");

  let visibility = $state<string | undefined>("team");
</script>

<div class="max-w-auto flex flex-wrap items-start gap-3 sm:max-w-sm">
  <ToggleGroup selectionMode="multiple" bind:value={formats}>
    <Toggle value="bold" iconOnly aria-label="Bold">
      <Icon icon={TextBoldIcon} />
    </Toggle>
    <Toggle value="italic" iconOnly aria-label="Italic">
      <Icon icon={TextItalicIcon} />
    </Toggle>
    <Toggle value="underline" iconOnly aria-label="Underline">
      <Icon icon={TextUnderlineIcon} />
    </Toggle>
  </ToggleGroup>

  <ToggleGroup selectionMode="single" bind:value={viewMode}>
    <Toggle value="grid">Grid</Toggle>
    <Toggle value="list">List</Toggle>
    <Toggle value="kanban">Kanban</Toggle>
  </ToggleGroup>

  <ToggleGroup variant="outline" selectionMode="multiple" bind:value={channels}>
    <Toggle value="email">Email</Toggle>
    <Toggle value="sms">SMS</Toggle>
    <Toggle value="push">Push</Toggle>
  </ToggleGroup>

  <ToggleGroup variant="outline" selectionMode="single" bind:value={activeAlignment}>
    <Toggle value="left" aria-label="Align left" iconOnly>
      <Icon icon={TextAlignLeftIcon} />
    </Toggle>

    <Toggle value="center" aria-label="Align center" iconOnly>
      <Icon icon={TextAlignCenterIcon} />
    </Toggle>

    <Toggle value="right" aria-label="Align right" iconOnly>
      <Icon icon={TextAlignRightIcon} />
    </Toggle>

    <Toggle value="justify" aria-label="Justify" iconOnly>
      <Icon icon={TextAlignJustifyCenterIcon} />
    </Toggle>
  </ToggleGroup>

  <ToggleGroup variant="ghost" selectionMode="single" bind:value={visibility}>
    <Toggle value="private">
      {#snippet startContent()}
        <Icon icon={SquareLock02Icon} />
      {/snippet}
      Private
    </Toggle>
    <Toggle value="team">
      {#snippet startContent()}
        <Icon icon={UserGroupIcon} />
      {/snippet}
      Team
    </Toggle>
    <Toggle value="public">
      {#snippet startContent()}
        <Icon icon={Globe02Icon} />
      {/snippet}
      Public
    </Toggle>
  </ToggleGroup>
</div>
