<script lang="ts">
  import { InputGroup, Label } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";
</script>

<div class="grid w-full max-w-64 gap-4">
  <div class="flex flex-col gap-2">
    <Label for="input-group-default">Default</Label>
    <InputGroup variant="default">
      <InputGroup.Prefix>
        <Icon icon={Mail01Icon} />
      </InputGroup.Prefix>
      <InputGroup.Input id="input-group-default" placeholder="Default input" />
    </InputGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-group-secondary">Secondary</Label>
    <InputGroup variant="secondary">
      <InputGroup.Prefix>
        <Icon icon={Mail01Icon} />
      </InputGroup.Prefix>
      <InputGroup.Input id="input-group-secondary" placeholder="Secondary input" />
    </InputGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-group-outline">Outline</Label>
    <InputGroup variant="outline">
      <InputGroup.Prefix>
        <Icon icon={Mail01Icon} />
      </InputGroup.Prefix>
      <InputGroup.Input id="input-group-outline" placeholder="Outline input" />
    </InputGroup>
  </div>
</div>
