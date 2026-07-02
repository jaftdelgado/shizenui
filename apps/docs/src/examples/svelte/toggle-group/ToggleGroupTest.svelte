<!-- Caso 30: disabled individual en multiple -->
<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { TextBoldIcon, TextItalicIcon, TextUnderlineIcon } from "@hugeicons/core-free-icons";
  let value = $state<string[]>([]);
</script>

<div class="flex flex-col items-start gap-2">
  <Description>multiple — Cursiva deshabilitada individualmente, los demás responden</Description>
  <ToggleGroup selectionMode="multiple" bind:value>
    <Toggle value="bold" iconOnly aria-label="Negrita">
      <Icon icon={TextBoldIcon} />
    </Toggle>
    <Toggle value="italic" iconOnly aria-label="Cursiva" disabled>
      <Icon icon={TextItalicIcon} />
    </Toggle>
    <Toggle value="underline" iconOnly aria-label="Subrayado">
      <Icon icon={TextUnderlineIcon} />
    </Toggle>
  </ToggleGroup>
</div>
