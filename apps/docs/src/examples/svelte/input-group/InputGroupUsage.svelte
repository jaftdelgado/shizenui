<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";

  let emailAlias = $state("");
</script>

<InputGroup class="w-full max-w-80">
  <InputGroup.Prefix>
    <Icon icon={Mail01Icon} />
  </InputGroup.Prefix>
  <InputGroup.Input bind:value={emailAlias} placeholder="billing" />
  <InputGroup.Suffix>@company.com</InputGroup.Suffix>
</InputGroup>
