<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { UserIcon } from "@hugeicons/core-free-icons";

  const MAX_LENGTH = 16;
  let username = $state("shizenui");

  function isOverLimit() {
    return username.length > MAX_LENGTH;
  }
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="username">Username</Label>
  <InputGroup>
    <InputGroup.Prefix>
      <Icon icon={UserIcon} />
    </InputGroup.Prefix>
    <InputGroup.Input
      id="username"
      bind:value={username}
      placeholder="Choose a username"
      aria-describedby="username-count username-hint"
    />
    <InputGroup.Suffix>
      <Description
        id="username-count"
        class="tabular-nums {isOverLimit() ? 'text-danger' : 'text-secondary-text'}"
      >
        {username.length}/{MAX_LENGTH}
      </Description>
    </InputGroup.Suffix>
  </InputGroup>
  <Description id="username-hint">Usernames should be 16 characters or fewer.</Description>
</div>
