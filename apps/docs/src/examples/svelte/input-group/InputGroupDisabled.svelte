<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Globe02Icon } from "@hugeicons/core-free-icons";
</script>

<div class="w-full max-w-64 flex-col gap-2">
  <InputGroup disabled>
    <InputGroup.Prefix>
      <Icon icon={Globe02Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input value="workspace.shizen.dev" />
    <InputGroup.Suffix>Locked</InputGroup.Suffix>
  </InputGroup>
</div>
