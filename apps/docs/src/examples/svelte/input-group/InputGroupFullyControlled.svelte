<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { DollarSignIcon } from "@hugeicons/core-free-icons";

  let budget = $state("1200");

  function sanitizeBudget(value: string): string {
    return value.replace(/[^\d]/g, "").slice(0, 6);
  }
</script>

<div class="flex w-full max-w-md flex-col gap-3">
  <InputGroup class="w-full">
    <InputGroup.Prefix>
      <Icon icon={DollarSignIcon} />
    </InputGroup.Prefix>
    <InputGroup.Input
      bind:value={() => budget, (value) => (budget = sanitizeBudget(value))}
      inputmode="numeric"
      placeholder="Monthly budget"
    />
    <InputGroup.Suffix>USD</InputGroup.Suffix>
  </InputGroup>

  <p class="text-muted-foreground text-sm">
    Monthly budget: {budget ? `$${Number(budget).toLocaleString()}` : "Not set"}
  </p>
</div>
