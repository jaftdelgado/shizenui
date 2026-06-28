<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { BoldIcon, TextItalicIcon, TextUnderlineIcon } from "@hugeicons/core-free-icons";

  let bold = $state(false);
  let italic = $state(false);
  let underline = $state(true);
</script>

<div class="flex w-full max-w-xs items-center gap-2">
  <Toggle
    bind:pressed={bold}
    class="h-auto flex-1 rounded-2xl py-2 [&_.toggle\_\_content]:flex-col [&_.toggle\_\_content]:gap-1.5 [&_.toggle\_\_icon--start]:m-0"
  >
    {#snippet startContent()}
      <Icon icon={BoldIcon} size={20} />
    {/snippet}
    Bold
  </Toggle>

  <Toggle
    bind:pressed={italic}
    class="h-auto flex-1 rounded-2xl py-2 [&_.toggle\_\_content]:flex-col [&_.toggle\_\_content]:gap-1.5 [&_.toggle\_\_icon--start]:m-0"
  >
    {#snippet startContent()}
      <Icon icon={TextItalicIcon} size={20} />
    {/snippet}
    Italic
  </Toggle>

  <Toggle
    bind:pressed={underline}
    class="h-auto flex-1 rounded-2xl py-2 [&_.toggle\_\_content]:flex-col [&_.toggle\_\_content]:gap-1.5 [&_.toggle\_\_icon--start]:m-0"
  >
    {#snippet startContent()}
      <Icon icon={TextUnderlineIcon} size={20} />
    {/snippet}
    Underline
  </Toggle>
</div>
