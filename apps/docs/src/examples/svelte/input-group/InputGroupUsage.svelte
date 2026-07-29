<script lang="ts">
  import { InputGroup, Chip } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";

  let emailAlias = $state("");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <InputGroup>
    <InputGroup.Prefix>
      <Icon icon={Mail01Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input bind:value={emailAlias} placeholder="billing" />
    <InputGroup.Suffix class="-mr-1">
      <Chip variant="soft" color="accent" size="sm">Pro</Chip>
    </InputGroup.Suffix>
  </InputGroup>
</div>
