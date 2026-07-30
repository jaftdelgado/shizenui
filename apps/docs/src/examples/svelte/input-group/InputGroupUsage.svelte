<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Globe02Icon } from "@hugeicons/core-free-icons";

  let websiteUrl = $state("https://shizenui");
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="website-url">Website URL</Label>
  <InputGroup>
    <InputGroup.Prefix>
      <Icon icon={Globe02Icon} />
    </InputGroup.Prefix>
    <InputGroup.Input
      id="website-url"
      bind:value={websiteUrl}
      type="text"
      aria-describedby="website-url-hint"
    />
    <InputGroup.Suffix>.com</InputGroup.Suffix>
  </InputGroup>
  <Description id="website-url-hint">Used for your public website.</Description>
</div>
