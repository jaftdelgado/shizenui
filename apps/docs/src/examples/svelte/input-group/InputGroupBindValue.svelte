<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Search01Icon } from "@hugeicons/core-free-icons";

  let query = $state("");
</script>

<div class="flex w-full max-w-md flex-col gap-3">
  <InputGroup>
    <InputGroup.Prefix>
      <Icon icon={Search01Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input bind:value={query} type="search" placeholder="Search transactions" />
  </InputGroup>

  <p class="text-muted-foreground text-sm">
    {query ? `Filtering results for "${query}"` : "All transactions are visible."}
  </p>
</div>
