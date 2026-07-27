<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Search01Icon } from "@hugeicons/core-free-icons";
</script>

<InputGroup
  class="w-full max-w-md rounded-full bg-neutral-900 text-white shadow-lg focus-within:ring-2 focus-within:ring-emerald-400"
>
  <InputGroup.Prefix class="text-emerald-300">
    <Icon icon={Search01Icon} />
  </InputGroup.Prefix>
  <InputGroup.Input
    class="placeholder:text-neutral-400"
    type="search"
    placeholder="Search deployments"
  />
  <InputGroup.Suffix class="text-xs text-neutral-400">⌘K</InputGroup.Suffix>
</InputGroup>
