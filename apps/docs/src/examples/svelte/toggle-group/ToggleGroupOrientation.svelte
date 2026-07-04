<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Layers01Icon, GridIcon, Image01Icon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-start gap-8">
  <div class="flex flex-col gap-2">
    <Description>Horizontal</Description>
    <ToggleGroup orientation="horizontal">
      <Toggle iconOnly aria-label="Layers">
        <Icon icon={Layers01Icon} />
      </Toggle>
      <Toggle iconOnly aria-label="Grid">
        <Icon icon={GridIcon} />
      </Toggle>
      <Toggle iconOnly aria-label="Preview">
        <Icon icon={Image01Icon} />
      </Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Vertical</Description>
    <ToggleGroup orientation="vertical">
      <Toggle iconOnly aria-label="Layers">
        <Icon icon={Layers01Icon} />
      </Toggle>
      <Toggle iconOnly aria-label="Grid">
        <Icon icon={GridIcon} />
      </Toggle>
      <Toggle iconOnly aria-label="Preview">
        <Icon icon={Image01Icon} />
      </Toggle>
    </ToggleGroup>
  </div>
</div>
