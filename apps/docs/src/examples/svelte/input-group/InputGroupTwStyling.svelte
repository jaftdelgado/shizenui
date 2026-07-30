<script lang="ts">
  import { InputGroup, Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { SmileIcon } from "@hugeicons/core-free-icons";

  let message = $state("");
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <InputGroup
    class="border-secondary-text bg-field-secondary focus-within:border-accent flex-row items-end rounded-t-lg rounded-b-none border-b-2 shadow-none transition-colors focus-within:shadow-none focus-within:ring-0"
  >
    <InputGroup.TextArea
      bind:value={message}
      placeholder="Type a message..."
      rows={2}
      class="resize-none pt-2 pb-1.5"
    />

    <InputGroup.Suffix class="w-auto shrink-0 gap-1 px-1 py-1">
      <Button variant="ghost" size="sm" iconOnly aria-label="Add emoji">
        <Icon icon={SmileIcon} />
      </Button>
    </InputGroup.Suffix>
  </InputGroup>
</div>
