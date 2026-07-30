<script lang="ts">
  import { InputGroup, Label } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";
</script>

<div class="grid w-full max-w-64 gap-4">
  <div class="flex flex-col gap-2">
    <Label for="input-group-sm">Small</Label>
    <InputGroup size="sm">
      <InputGroup.Prefix>
        <Icon icon={Mail01Icon} size={14} />
      </InputGroup.Prefix>
      <InputGroup.Input id="input-group-sm" placeholder="Small input" />
    </InputGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-group-md">Medium (default)</Label>
    <InputGroup size="md">
      <InputGroup.Prefix>
        <Icon icon={Mail01Icon} />
      </InputGroup.Prefix>
      <InputGroup.Input id="input-group-md" placeholder="Medium input" />
    </InputGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Label for="input-group-lg">Large</Label>
    <InputGroup size="lg">
      <InputGroup.Prefix>
        <Icon icon={Mail01Icon} size={18} />
      </InputGroup.Prefix>
      <InputGroup.Input id="input-group-lg" placeholder="Large input" />
    </InputGroup>
  </div>
</div>
