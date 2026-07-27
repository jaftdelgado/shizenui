<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Message02Icon } from "@hugeicons/core-free-icons";

  let note = $state("");
</script>

<InputGroup class="w-full max-w-lg">
  <InputGroup.Prefix>
    <Icon icon={Message02Icon} />
  </InputGroup.Prefix>
  <InputGroup.TextArea
    bind:value={note}
    rows={5}
    placeholder="Share handoff notes for the support team"
  />
</InputGroup>
