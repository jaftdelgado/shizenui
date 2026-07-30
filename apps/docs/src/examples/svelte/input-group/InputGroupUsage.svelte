<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Search01Icon, CommandIcon } from "@hugeicons/core-free-icons";
</script>

<InputGroup>
  <InputGroup.Prefix>
    <Icon icon={Search01Icon} />
  </InputGroup.Prefix>
  <InputGroup.Input placeholder="Search documentation..." />
  <InputGroup.Suffix>
    <Icon icon={CommandIcon} />
  </InputGroup.Suffix>
</InputGroup>
