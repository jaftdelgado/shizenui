<script lang="ts">
  import { InputGroup, Chip, Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import {
    FileScriptIcon,
    AttachmentIcon,
    Mic01Icon,
    ArrowUp02Icon
  } from "@hugeicons/core-free-icons";

  let message = $state("");
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <InputGroup>
    <InputGroup.Prefix>
      <Chip variant="secondary" size="sm">
        {#snippet startContent()}
          <Icon icon={FileScriptIcon} class="size-3" />
        {/snippet}
        useAuth.ts
      </Chip>
    </InputGroup.Prefix>

    <InputGroup.TextArea
      bind:value={message}
      placeholder="Ask Claude about this file..."
      rows={2}
    />

    <InputGroup.Suffix class="flex w-full items-center justify-between">
      <Button variant="outline" size="sm">
        {#snippet startContent()}
          <Icon icon={AttachmentIcon} />
        {/snippet}
        Upload
      </Button>

      <div class="flex items-center gap-1">
        <Button variant="outline" size="sm" iconOnly aria-label="Use microphone">
          <Icon icon={Mic01Icon} />
        </Button>
        <Button size="sm" iconOnly aria-label="Send message">
          <Icon icon={ArrowUp02Icon} />
        </Button>
      </div>
    </InputGroup.Suffix>
  </InputGroup>
</div>
