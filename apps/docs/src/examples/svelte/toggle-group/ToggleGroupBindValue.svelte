<script lang="ts">
  import { Toggle, ToggleGroup, Button, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Bug01Icon, RocketIcon, Time04Icon } from "@hugeicons/core-free-icons";

  let labels = $state<string[]>(["bug"]);
</script>

<div class="flex flex-col items-start gap-6">
  <div class="flex flex-col gap-2">
    <Description>Applied: {labels.join(", ") || "none"}</Description>
    <ToggleGroup variant="outline" selectionMode="multiple" bind:value={labels}>
      <Toggle value="bug">
        {#snippet startContent()}
          <Icon icon={Bug01Icon} />
        {/snippet}
        Bug
      </Toggle>
      <Toggle value="feature">
        {#snippet startContent()}
          <Icon icon={RocketIcon} />
        {/snippet}
        Feature
      </Toggle>
      <Toggle value="urgent">
        {#snippet startContent()}
          <Icon icon={Time04Icon} />
        {/snippet}
        Urgent
      </Toggle>
    </ToggleGroup>
  </div>
  <div class="flex gap-2">
    <Button size="sm" variant="secondary" onclick={() => (labels = ["bug", "feature", "urgent"])}>
      Apply all
    </Button>
    <Button size="sm" variant="secondary" onclick={() => (labels = [])}>Clear</Button>
  </div>
</div>
