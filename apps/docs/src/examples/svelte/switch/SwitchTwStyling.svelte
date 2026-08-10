<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";

  const permissions = [
    {
      id: "public_profile",
      label: "Public profile",
      description: "Anyone can view your profile.",
      checked: true
    },
    {
      id: "search_indexing",
      label: "Search indexing",
      description: "Allow search engines to index you.",
      checked: false
    }
  ];
</script>

<div class="flex flex-col gap-3">
  {#each permissions as item}
    <Switch
      bind:checked={item.checked}
      class="
          [--switch-padding:0rem]
          [--switch-thumb-ratio:1]
          [--switch-thumb-size:1rem]
          [--switch-width:1.75rem]
        "
    >
      <Switch.Control class="h-3 bg-neutral-300 data-checked:bg-violet-300">
        <Switch.Thumb class="bg-neutral-400 data-checked:bg-violet-600" />
      </Switch.Control>
      <Switch.Content>
        <Label>{item.label}</Label>
        <Description>{item.description}</Description>
      </Switch.Content>
    </Switch>
  {/each}
</div>
