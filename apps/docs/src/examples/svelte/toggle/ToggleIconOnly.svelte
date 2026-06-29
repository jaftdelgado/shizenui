<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { BoldIcon, TextItalicIcon, TextUnderlineIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center gap-2">
  <Toggle iconOnly aria-label="Bold">
    <Icon icon={BoldIcon} />
  </Toggle>

  <Toggle iconOnly aria-label="Italic">
    <Icon icon={TextItalicIcon} />
  </Toggle>

  <Toggle iconOnly aria-label="Underline">
    <Icon icon={TextUnderlineIcon} />
  </Toggle>
</div>
