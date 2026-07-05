<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Layers01Icon, GridIcon, Image01Icon } from "@hugeicons/core-free-icons";

  let horizontalValue = $state<string | undefined>(undefined);
  let verticalValue = $state<string | undefined>(undefined);
</script>

<div class="flex items-start gap-8">
  <div class="flex flex-col items-start gap-2">
    <Description>Horizontal</Description>
    <ToggleGroup orientation="horizontal" selectionMode="single" bind:value={horizontalValue}>
      <Toggle value="layers" iconOnly aria-label="Layers">
        <Icon icon={Layers01Icon} />
      </Toggle>
      <Toggle value="grid" iconOnly aria-label="Grid">
        <Icon icon={GridIcon} />
      </Toggle>
      <Toggle value="preview" iconOnly aria-label="Preview">
        <Icon icon={Image01Icon} />
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col items-start gap-2">
    <Description>Vertical</Description>
    <ToggleGroup orientation="vertical" selectionMode="single" bind:value={verticalValue}>
      <Toggle value="layers" iconOnly aria-label="Layers">
        <Icon icon={Layers01Icon} />
      </Toggle>
      <Toggle value="grid" iconOnly aria-label="Grid">
        <Icon icon={GridIcon} />
      </Toggle>
      <Toggle value="preview" iconOnly aria-label="Preview">
        <Icon icon={Image01Icon} />
      </Toggle>
    </ToggleGroup>
  </div>
</div>
