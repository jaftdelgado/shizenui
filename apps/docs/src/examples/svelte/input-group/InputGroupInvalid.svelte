<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Alert02Icon, Mail01Icon } from "@hugeicons/core-free-icons";

  let email = $state("billing@");
</script>

<div class="flex w-full max-w-md flex-col gap-2">
  <InputGroup invalid required class="w-full">
    <InputGroup.Prefix>
      <Icon icon={Mail01Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input
      bind:value={email}
      type="email"
      aria-describedby="billing-email-error"
      placeholder="billing@company.com"
    />
    <InputGroup.Suffix>
      <Icon icon={Alert02Icon} />
    </InputGroup.Suffix>
  </InputGroup>

  <p id="billing-email-error" class="text-danger text-sm">Enter a valid billing email address.</p>
</div>
