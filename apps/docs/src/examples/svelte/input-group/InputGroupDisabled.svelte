<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { SquareLock02Icon } from "@hugeicons/core-free-icons";

  let repoName = $state("acme-corp/dashboard-app");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="repo-name">Repository name</Label>
  <InputGroup disabled>
    <InputGroup.Prefix>
      <Icon icon={SquareLock02Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input id="repo-name" bind:value={repoName} aria-describedby="repo-name-hint" />
  </InputGroup>
  <Description id="repo-name-hint">Repository name can't be changed after deployment</Description>
</div>
