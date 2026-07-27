<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { DollarSignIcon, PercentIcon } from "@hugeicons/core-free-icons";
</script>

<div class="grid w-full max-w-lg gap-3">
  <InputGroup size="sm">
    <InputGroup.Prefix>
      <Icon icon={DollarSignIcon} size={14} />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Compact amount" />
    <InputGroup.Suffix>USD</InputGroup.Suffix>
  </InputGroup>

  <InputGroup size="md">
    <InputGroup.Prefix>
      <Icon icon={DollarSignIcon} />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Default amount" />
    <InputGroup.Suffix>USD</InputGroup.Suffix>
  </InputGroup>

  <InputGroup size="lg">
    <InputGroup.Prefix>
      <Icon icon={PercentIcon} size={18} />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Promotional discount" />
    <InputGroup.Suffix>%</InputGroup.Suffix>
  </InputGroup>
</div>
